import { FormControl } from "@angular/forms";

export function restrictedWords(words) {
  return function (control: FormControl): { [key: string]: any } {

    let invalidWords = words
      .filter(w => control.value.includes(w));

    return invalidWords.length ? { 'restrictedWords': invalidWords.join(', ') } : null;
  }
}