const htmlsToReplace = {
  "&quot;": `"`,
  "&amp;": "&",
  "&shy;": "-",
  "&eacute;": "é",
  "&Uuml;": "Ü",
  "&uuml;": `ü`,
  "&ldquo;": `‘`,
  "&rsquo;": `’`,
  "&#039;": `'`,
  "&euml;": `ë`,
  "&rdquo;": `”`,
  "&Iacute;": `Í`,
  "&aacute;": `á`,
  "&Aacute;": `Á`,
  "&ntilde;": `ñ`,
  "&pi;": `π`,
  "&ouml": `ö`,
  "&Ouml": `Ö`,
  "&iacute": `í`,
  "&deg;": `°`,
};

const removeHTMLCharacters = (string) => {
  if (!string) return "";
  let modifiedString = string;
  
  // Clean translation using native JS loops instead of older third-party helper libraries
  for (let [html, replacementString] of Object.entries(htmlsToReplace)) {
    modifiedString = modifiedString.replaceAll(html, replacementString);
  }
  return modifiedString;
};

export const convertToRegularString = (string) => {
  if (!string) return "";
  
  return removeHTMLCharacters(
    string.replace(/&#(?:x([\da-f]+)|(\d+));/gi, function (_, hex, dec) {
      return String.fromCharCode(dec || +("0x" + hex));
    })
  );
};