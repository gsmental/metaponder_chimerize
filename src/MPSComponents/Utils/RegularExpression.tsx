export class RegularExpression {
  static String = new RegExp(/^[A-Za-z]+$/);
  static Number = new RegExp("^[0-9]+$");
  static Email = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
  static FloatOrNumber = new RegExp("^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$");
  static MobileNumber = /^[6-9]\d{9}$/;
}
