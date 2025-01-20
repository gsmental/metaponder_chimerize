import Swal, { SweetAlertPosition } from "sweetalert2";


interface SwalFireOptions {
  showOkButton?: boolean;
  timer?: number | null;
  toast?: boolean;
  position?: SweetAlertPosition;
}

declare const XLSX: any;
export class AdvanceSolutionsNew {
  static swal_fire_all = async (
    titleText: string,
    icon: "success" | "error" | "warning" | "info" | "question",
    options: SwalFireOptions = {}
  ) => {
    const {
      showOkButton = icon === "success" ? false : true,
      timer = icon === "success" ? 2000 : null,
      toast = icon === "success" ? true : false,
      position = icon === "success" ? "top-right" : "center",
    } = options;

    return Swal.fire({
      titleText,
      icon,
      showConfirmButton: showOkButton,
      toast,
      timer: timer ?? undefined,
      position,
    });
  };

  // static swal_fire_saved = async () => {
  //   this.swal_fire_all("Your data has been successfully saved!", "success");
  // };

  // static swal_fire_delete = async () => {
  //   this.swal_fire_all("Your data has been successfully deleted!", "success");
  // };

  // static swal_fire_update = async () => {
  //   this.swal_fire_all("Your data has been successfully updated!", "success");
  // };

  static swal_fire_error = async (titleText: string) => {
    return Swal.fire({
      titleText: titleText,
      icon: "error",
    });
  };
}
