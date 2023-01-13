import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectTranslate',
  standalone: true
})
export class ObjectTranslatePipe implements PipeTransform {
  public transform(value: any | any[], keyProperties: string[], translateFn: Function): any | any[] {
    if (value instanceof Array) {
      return this.translateArrayOfObjects(value, keyProperties, translateFn);
    }

    return this.translateSingleObject(value, keyProperties, translateFn)
  }

  private translateSingleObject(value: any, keyProperties: string[], translateFn: Function): any {
    const result: any = { ...value };
    for (const key of keyProperties) {
      result[key] = translateFn(result[key]);
    }
    return result;
  }

  private translateArrayOfObjects(value: any[], keyProperties: string[], translateFn: Function): any[] {
    const translatedArray: any[] = [];
    for(let i = value.length; i--;) {
      translatedArray.splice(0, 0, this.translateSingleObject(value[i], keyProperties, translateFn));
    }
    return translatedArray;
  }
}
