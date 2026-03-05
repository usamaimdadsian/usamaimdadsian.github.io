function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function formatInlineMarkdown(value) {
  let formatted = escapeHtml(value);

  formatted = formatted.replace(/`([^`]+)`/g, "<code>$1</code>");
  formatted = formatted.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  formatted = formatted.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  formatted = formatted.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  return formatted;
}

function closeList(blocks, listItems, listType) {
  if (listItems.length > 0) {
    blocks.push({
      type: listType,
      items: [...listItems],
    });
    listItems.length = 0;
  }
}

export function markdownToHtml(markdown) {
  if (!markdown || !markdown.trim()) {
    return "";
  }

  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks = [];
  const paragraph = [];
  const listItems = [];
  let listType = null;
  let inCodeBlock = false;
  let codeLines = [];

  function closeParagraph() {
    if (paragraph.length > 0) {
      blocks.push({
        type: "paragraph",
        content: paragraph.join(" "),
      });
      paragraph.length = 0;
    }
  }

  function closeCurrentList() {
    if (listType) {
      closeList(blocks, listItems, listType);
      listType = null;
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      closeParagraph();
      closeCurrentList();

      if (inCodeBlock) {
        blocks.push({
          type: "code",
          content: codeLines.join("\n"),
        });
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }

      continue;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    if (!line.trim()) {
      closeParagraph();
      closeCurrentList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      closeParagraph();
      closeCurrentList();
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        content: headingMatch[2],
      });
      continue;
    }

    const unorderedMatch = line.match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      closeParagraph();
      if (listType && listType !== "ul") {
        closeCurrentList();
      }
      listType = "ul";
      listItems.push(unorderedMatch[1]);
      continue;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      closeParagraph();
      if (listType && listType !== "ol") {
        closeCurrentList();
      }
      listType = "ol";
      listItems.push(orderedMatch[1]);
      continue;
    }

    const quoteMatch = line.match(/^>\s+(.+)$/);
    if (quoteMatch) {
      closeParagraph();
      closeCurrentList();
      blocks.push({
        type: "quote",
        content: quoteMatch[1],
      });
      continue;
    }

    paragraph.push(line);
  }

  closeParagraph();
  closeCurrentList();

  if (inCodeBlock && codeLines.length > 0) {
    blocks.push({
      type: "code",
      content: codeLines.join("\n"),
    });
  }

  return blocks
    .map((block) => {
      if (block.type === "heading") {
        const level = Math.min(block.level + 1, 6);
        return `<h${level}>${formatInlineMarkdown(block.content)}</h${level}>`;
      }

      if (block.type === "paragraph") {
        return `<p>${formatInlineMarkdown(block.content)}</p>`;
      }

      if (block.type === "quote") {
        return `<blockquote><p>${formatInlineMarkdown(block.content)}</p></blockquote>`;
      }

      if (block.type === "code") {
        return `<pre><code>${escapeHtml(block.content)}</code></pre>`;
      }

      if (block.type === "ul" || block.type === "ol") {
        const items = block.items.map((item) => `<li>${formatInlineMarkdown(item)}</li>`).join("");
        return `<${block.type}>${items}</${block.type}>`;
      }

      return "";
    })
    .join("");
}
