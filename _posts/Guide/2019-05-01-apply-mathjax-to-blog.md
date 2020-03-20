---
title: "Github.io에 MathJax 추가하기 & latex 사용법"
excerpt: "mmistakes/mm-github-pages-starter를 사용하는 사람들을 위해"
date: 2019-05-01
categories:
  - Guide
tags:
  - Blog
  - MathJax
  - Jekyll
  - latex
teaser: /assets/images/teaser/guide.jpg
use_math: true
toc: true
toc_label: "Table of contents"
toc_icon: "heart"  # corresponding Font Awesome icon name (without fa prefix)
toc_sticky: true
classes: wide
---

## MathJax

[MathJax](https://github.com/mathjax/MathJax)를 사용하면 [Jekyll](https://jekyllrb.com/) Github 블로그에서 수학식 표시 가능할 수 있습니다. 

### MathJax 적용 방법

#### 마크다운 엔진 변경

`_config.yml` 파일의 내용을 아래와 같이 수정합니다. 

```yml
# Conversion
markdown: kramdown
highlighter: rouge
lsi: false
excerpt_separator: "\n\n"
incremental: false
```

#### `mathjax_support.html` 파일 생성

`_includes` 디렉토리에 `mathjax_support.html` 파일 생성 후 아래 내용 입력

```html
<script type="text/x-mathjax-config">
MathJax.Hub.Config({
    TeX: {
      equationNumbers: {
        autoNumber: "AMS"
      }
    },
    tex2jax: {
    inlineMath: [ ['$', '$'] ],
    displayMath: [ ['$$', '$$'] ],
    processEscapes: true,
  }
});
MathJax.Hub.Register.MessageHook("Math Processing Error",function (message) {
	  alert("Math Processing Error: "+message[1]);
	});
MathJax.Hub.Register.MessageHook("TeX Jax - parse error",function (message) {
	  alert("Math Processing Error: "+message[1]);
	});
</script>
<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML">
</script>
```

#### `_layouts/default.html` 파일의 `<head>` 부분에 아래 내용 삽입

만약 mmistakes/mm-github-pages-starter를 fork해서 _layouts가 존재하지 않는다면 [_includes](https://github.com/mmistakes/minimal-mistakes/tree/master/_layouts)와 
[_layouts](https://github.com/mmistakes/minimal-mistakes/tree/master/_layouts) 디렉토리 전체를 블로그 Root directory에 가져와서 복사합니다.  
그리고 _include/search 파일에 있는 search_form.html를 `복사`해서 _include 디렉토리에도 하나 만들어 줍니다. (이는 `bundle exec jekyll serve`를 할 때 _includes에 있는 search_form.html을 찾는데 빠르게 해결하기 위함입니다.)

{% raw %}
```html
{% if page.use_math %}
  {% include mathjax_support.html %}
{% endif %}
```
{% endraw %}

#### YAML front-matter 설정

수학식을 표시할 포스트의 front-matter에 `use_math: true` 적용

```yml
---
title: "Jekyll Github 블로그에 MathJax로 수학식 표시하기"
tags:
  - Blog
  - MathJax
  - Jekyll
  - LaTeX
use_math: true
---
```

### MathJax를 통한 수학식 표현의 예

#### `$...$`를 활용한 인라인 수식 표현

```latex
This formula $f(x) = x^2$ is an example.
```
> This formula $f(x) = x^2$ is an example.

#### `$$...$$`를 활용한 수식 표현

```latex
$$
\lim_{x\to 0}{\frac{e^x-1}{2x}}
\overset{\left[\frac{0}{0}\right]}{\underset{\mathrm{H}}{=}}
\lim_{x\to 0}{\frac{e^x}{2}}={\frac{1}{2}}
$$
```
>
$$
\lim_{x\to 0}{\frac{e^x-1}{2x}}
\overset{\left[\frac{0}{0}\right]}{\underset{\mathrm{H}}{=}}
\lim_{x\to 0}{\frac{e^x}{2}}={\frac{1}{2}}
$$

## 수식 정렬

```latex
$$
\begin{align}
\sqrt{37} & = \sqrt{\frac{73^2-1}{12^2}} \\
 & = \sqrt{\frac{73^2}{12^2}\cdot\frac{73^2-1}{73^2}} \\ 
 & = \sqrt{\frac{73^2}{12^2}}\sqrt{\frac{73^2-1}{73^2}} \\
 & = \frac{73}{12}\sqrt{1 - \frac{1}{73^2}} \\ 
 & \approx \frac{73}{12}\left(1 - \frac{1}{2\cdot73^2}\right)
\end{align}
$$
```
아래와 같이 쓰면 오른쪽의 (1) ~ (5)이 출력안되게 할 수 있습니다. 

```latex
$$
\begin{align*}  
\end{align*}  
$$
```

>
$$
\begin{align}
\sqrt{37} & = \sqrt{\frac{73^2-1}{12^2}} \\
 & = \sqrt{\frac{73^2}{12^2}\cdot\frac{73^2-1}{73^2}} \\ 
 & = \sqrt{\frac{73^2}{12^2}}\sqrt{\frac{73^2-1}{73^2}} \\
 & = \frac{73}{12}\sqrt{1 - \frac{1}{73^2}} \\ 
 & \approx \frac{73}{12}\left(1 - \frac{1}{2\cdot73^2}\right)
\end{align}
$$

## Matrix

```latex
$$
    \begin{matrix}
    1 & x & x^2 \\
    1 & \ddots & \vdots \\
    1 \cdots  & z^2 \\
    \end{matrix}
$$
```
>
$$
    \left(
    \begin{matrix}
    1 & x & x^2 \\
    1 & \ddots & \vdots \\
    1 & \cdots & z^2 \\
    \end{matrix}
    \right)
$$

혹은 `\left(...\right)`를 사용하지 않고 간단히 `\begin{matrix}`를 아래와 같이 수정합니다.

1. \begin{pmatrix}
1. \begin{bmatrix}
1. \begin{Bmatrix}
1. \begin{vmatrix}
1. \begin{Vmatrix} 를 사용합니다. 


```latex
$$
    \begin{matrix}
    1 & x & x^2 \\
    1 & \ddots & \vdots \\
    1 \cdots  & z^2 \\
    \end{matrix}
$$
```
>
$$
    \begin{Bmatrix}
    1 & x & x^2 \\
    1 & \ddots & \vdots \\
    1 & \cdots  & z^2 \\
    \end{Bmatrix}
$$

## Greek Symbols
```latex
$$
\alpha
$$
```
>
$$
\alpha
$$

```latex
$$
\beta
$$
```
>
$$
\beta
$$

```latex
$$
\gamma
$$
```
>
$$
\gamma
$$

## Differential Symbol

```latex
$$
\partial
$$
```
>
$$
\partial
$$

---

## References
- [mkkim85님의 블로그](https://mkkim85.github.io/blog-apply-mathjax-to-jekyll-and-github-pages/)
- [perfect-mathjax-tutorial](https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference)