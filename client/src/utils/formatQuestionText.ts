/** מסיר קידומת מספר שאלה מהמאגר, למשל "0112. " */
export function formatQuestionText(text: string): string {
  if (/^\d{4}\.\s/.test(text)) {
    return text.slice(6);
  }
  return text;
}
