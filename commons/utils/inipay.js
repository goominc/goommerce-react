import _ from 'lodash';

export function vBankCodeToName(code) {
  code = _.trim(code.toString());
  if (code === '11') {
    return '농협';
  }
  if (code === '04') {
    return '국민은행';
  }
  if (code === '88') {
    return '신한은행';
  }
  if (code === '20') {
    return '우리은행';
  }
  if (code === '03') {
    return '기업은행';
  }
  if (code === '81') {
    return '하나은행';
  }
  if (code === '05') {
    return '하나은행(구 외환)';
  }
  if (code === '31') {
    return '대구은행';
  }
  if (code === '32') {
    return '부산은행';
  }
  if (code === '71') {
    return '우체국';
  }
  if (code === '34') {
    return '광주은행';
  }
  if (code === '23') {
    return 'SC은행';
  }
  if (code === '39') {
    return '경남은행';
  }
  if (code === '53') {
    return '한국씨티은행';
  }
  if (code === '07') {
    return '수협';
  }
  return '';
}
