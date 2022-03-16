export interface IValidateData {
  field: string;
  regex?: {
    pattern: RegExp | string;
    message: string;
  }[];
  message: string;
}

export interface IValidateRes {}

const ValidateData = (
  data: any,
  validateData: IValidateData[],
  isDefaultRender: boolean = false
) => {
  let x: any = {};
  let isValid: boolean = true;

  Object.keys(data).forEach((d) => {
    const thisField = validateData.find((v) => v.field === d);

    if (thisField) {
      if (!data[d] && thisField.message) {
        x[d] = thisField.message;
        isValid = false;
      } else if (thisField.regex) {
        thisField.regex.forEach((t) => {
          if (!data[d].match(t.pattern)) {
            x[d] = t.message;
            isValid = false;
            return;
          }
        });
      }
    }
  });

  return isDefaultRender
    ? { data: {}, isValid: isValid }
    : { data: x, isValid: isValid };
};

export default ValidateData;
