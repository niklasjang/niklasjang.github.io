---
title: "Github Jekyll Post Localhost에서 확인하기"
excerpt: ""
date: 2020-03-22
categories:
  - Guide
tags:
  - guide
toc : true
toc_label: "Table of contents"
toc_icon: "list"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
---

1. git clone https://github.com/niklasjang/niklasjang.github.io.git
2. cd niklasjang.github.io
3. bundle install
4. chcp 65001 //한글을 인코딩하기 위한 code pade 변경
5. local에서 post 작업
6. bundle exec jekyll serve
7. localhost:4000 접속 후 확인
8. remote에 올리는 경우 commit & push
