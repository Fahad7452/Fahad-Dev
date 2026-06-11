// Custom SplitText replacement for gsap-trial/SplitText

export class SplitText {
  chars: HTMLElement[] = [];
  lines: HTMLElement[] = [];
  words: HTMLElement[] = [];
  private originalElements: { el: HTMLElement; html: string }[] = [];

  constructor(
    target: HTMLElement | string | string[],
    options: { type?: string; linesClass?: string } = {}
  ) {
    const type = options.type || "chars";
    const linesClass = options.linesClass || "";

    if (target instanceof HTMLElement) {
      this.originalElements.push({ el: target, html: target.innerHTML });
      this.splitElement(target, type, linesClass);
      return;
    }

    const selectors = Array.isArray(target) ? target : [target];
    selectors.forEach((sel: string) => {
      const elements = document.querySelectorAll<HTMLElement>(sel);
      elements.forEach((el: HTMLElement) => {
        this.originalElements.push({ el, html: el.innerHTML });
        this.splitElement(el, type, linesClass);
      });
    });
  }

  private splitElement(el: HTMLElement, type: string, linesClass: string) {
    const text = el.innerText || el.textContent || "";
    const includeChars = type.includes("chars");
    const includeWords = type.includes("words");
    const includeLines = type.includes("lines");

    el.innerHTML = "";

    if (includeLines) {
      const lineWrapper = document.createElement("div");
      lineWrapper.className = linesClass || "split-line";
      lineWrapper.style.overflow = "hidden";
      lineWrapper.style.display = "block";

      const wordList = text.split(" ").filter(Boolean);
      wordList.forEach((word: string, i: number) => {
        if (includeChars) {
          word.split("").forEach((char: string) => {
            const charSpan = document.createElement("span");
            charSpan.style.display = "inline-block";
            charSpan.textContent = char;
            lineWrapper.appendChild(charSpan);
            this.chars.push(charSpan);
          });
        } else {
          const wordSpan = document.createElement("span");
          wordSpan.style.display = "inline-block";
          wordSpan.textContent = word;
          lineWrapper.appendChild(wordSpan);
          this.words.push(wordSpan);
        }

        if (i < wordList.length - 1) {
          const space = document.createElement("span");
          space.innerHTML = "&nbsp;";
          space.style.display = "inline-block";
          lineWrapper.appendChild(space);
        }
      });

      el.appendChild(lineWrapper);
      this.lines.push(lineWrapper);

    } else if (includeWords) {
      const wordList = text.split(" ").filter(Boolean);
      wordList.forEach((word: string, i: number) => {
        const wordSpan = document.createElement("span");
        wordSpan.style.display = "inline-block";
        wordSpan.textContent = word;
        el.appendChild(wordSpan);
        this.words.push(wordSpan);

        if (i < wordList.length - 1) {
          const space = document.createElement("span");
          space.innerHTML = "&nbsp;";
          space.style.display = "inline-block";
          el.appendChild(space);
        }
      });

    } else if (includeChars) {
      text.split("").forEach((char: string) => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.innerHTML = char === " " ? "&nbsp;" : char;
        el.appendChild(span);
        this.chars.push(span);
      });
    }
  }

  revert() {
    this.originalElements.forEach(({ el, html }) => {
      el.innerHTML = html;
    });
    this.chars = [];
    this.lines = [];
    this.words = [];
  }
}