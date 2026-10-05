#!/usr/bin/env python3
"""靜態網站基本檢查：HTML 標籤配對、內部連結／圖片／CSS／JS 參照是否存在。

純 stdlib，不需要額外安裝套件，方便在 CI 或本機直接執行：
    python3 .github/scripts/validate.py
"""
import pathlib
import sys
from html.parser import HTMLParser
from urllib.parse import urlparse

REPO_ROOT = pathlib.Path(__file__).resolve().parent.parent.parent
VOID_TAGS = {"meta", "link", "img", "br", "input", "hr", "area", "source", "col", "embed"}
REF_ATTRS = {
    "a": "href",
    "link": "href",
    "script": "src",
    "img": "src",
}


class TagChecker(HTMLParser):
    def __init__(self, filename):
        super().__init__()
        self.filename = filename
        self.stack = []
        self.errors = []
        self.refs = []  # (tag, attr_value, line)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in REF_ATTRS and REF_ATTRS[tag] in attrs:
            # <img onerror="..."> 是專案既有慣例（成員大頭照版位，見 CLAUDE.md）：
            # 照片還沒補上時，靠 onerror 隱藏 <img>、底下的姓氏色塊當備援，
            # 缺檔案是預期狀態、不是壞掉的連結，所以這裡標記起來，檢查時只當警告
            has_onerror_fallback = tag == "img" and "onerror" in attrs
            self.refs.append((tag, attrs[REF_ATTRS[tag]], self.getpos()[0], has_onerror_fallback))
        if tag not in VOID_TAGS:
            self.stack.append((tag, self.getpos()[0]))

    def handle_startendtag(self, tag, attrs):
        attrs = dict(attrs)
        if tag in REF_ATTRS and REF_ATTRS[tag] in attrs:
            has_onerror_fallback = tag == "img" and "onerror" in attrs
            self.refs.append((tag, attrs[REF_ATTRS[tag]], self.getpos()[0], has_onerror_fallback))

    def handle_endtag(self, tag):
        if not self.stack:
            self.errors.append(f"第 {self.getpos()[0]} 行：多出的結束標籤 </{tag}>，沒有對應的開始標籤")
            return
        if self.stack[-1][0] != tag:
            self.errors.append(
                f"第 {self.getpos()[0]} 行：</{tag}> 與最近的開始標籤 <{self.stack[-1][0]}>"
                f"（第 {self.stack[-1][1]} 行）不匹配"
            )
            return
        self.stack.pop()


def is_local_ref(value):
    if not value:
        return False
    if value.startswith(("http://", "https://", "mailto:", "tel:", "#")):
        return False
    parsed = urlparse(value)
    if parsed.scheme:
        return False
    return True


def check_file(html_path):
    text = html_path.read_text(encoding="utf-8")
    checker = TagChecker(html_path.name)
    checker.feed(text)

    problems = list(checker.errors)
    warnings = []
    if checker.stack:
        unclosed = ", ".join(f"<{t}>(第{l}行)" for t, l in checker.stack)
        problems.append(f"檔案結尾仍有未關閉的標籤: {unclosed}")

    for tag, ref, line, has_onerror_fallback in checker.refs:
        if not is_local_ref(ref):
            continue
        target = (html_path.parent / ref.split("#")[0]).resolve()
        if not target.exists():
            msg = f"第 {line} 行：<{tag}> 參照的檔案不存在: {ref}"
            if has_onerror_fallback:
                warnings.append(msg + "（有 onerror 備援，成員照片尚未補上屬於預期狀態）")
            else:
                problems.append(msg)

    return problems, warnings


def main():
    html_files = sorted(REPO_ROOT.glob("*.html"))
    if not html_files:
        print("找不到任何 .html 檔案，請確認執行路徑")
        return 1

    all_problems = {}
    all_warnings = {}
    for f in html_files:
        problems, warnings = check_file(f)
        if problems:
            all_problems[f.name] = problems
        if warnings:
            all_warnings[f.name] = warnings

    for name in sorted(all_problems):
        print(f"\n[FAIL] {name}")
        for p in all_problems[name]:
            print(f"  - {p}")

    for name in sorted(all_warnings):
        print(f"\n[WARN] {name}")
        for w in all_warnings[name]:
            print(f"  - {w}")

    ok_files = [f.name for f in html_files if f.name not in all_problems]
    if ok_files:
        print("\n[OK] " + ", ".join(sorted(ok_files)))

    if all_problems:
        print(f"\n共 {len(all_problems)} 個檔案有問題。")
        return 1

    print(f"\n全部 {len(html_files)} 個 HTML 檔案檢查通過。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
