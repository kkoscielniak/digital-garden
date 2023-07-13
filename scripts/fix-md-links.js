import fs from "fs";

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error("No file paths provided.");
  console.log("Usage: node script.js file1.md file2.md ...");
  process.exit(1);
}

// Process each file path provided
args.forEach((markdownFilePath) => {
  // Check if the file exists
  const fullPath = `${process.env.INIT_CWD}/${markdownFilePath}`;
  console.log(fullPath);

  // console.log(process.env);
  if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${fullPath}`);
    return;
  }

  fs.readFile(fullPath, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading file: ${fullPath}`, err);
      return;
    }

    const modifiedData = prependLinks(data);

    fs.writeFile(fullPath, modifiedData, "utf8", (err) => {
      if (err) {
        console.error(`Error writing file: ${fullPath}`, err);
      } else {
        console.log(`Links in ${fullPath} prepended successfully!`);
      }
    });
  });
});

function prependLinks(data) {
  const lines = data.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check if the line contains a Markdown link
    if (/\[.*\]\(.*\)/.test(line)) {
      const modifiedLine = line.replace(
        /\[(.*?)\]\((.*?)\)/g,
        (_, text, url) => {
          // Prepend URL with '/' if it doesn't start with 'http'
          if (!url.startsWith("http") && !url.startsWith("/")) {
            return `[${text}](/${url.tolowercase()})`;
          } else {
            return `[${text}](/${url.tolowercase()})`;
          }
        }
      );

      lines[i] = modifiedLine;
    }
  }

  return lines.join("\n");
}
