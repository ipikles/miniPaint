import File_save_class from "../file/save.js";
import Dialog_class from "./../../libs/popup.js";
import Base_layers_class from "./../../core/base-layers.js";
import config from "./../../config.js";

export default class Blueplan_save_class {
  constructor() {
    this.MiniPainSave = new File_save_class();
    this.POP = new Dialog_class();
    this.Base_layers = new Base_layers_class();
  }

  async save() {
    this._save_action(false);
  }

  replace() {
    this._save_action(true);
  }

  async _save_action(replace = true) {
    if (!window.BP_IMAGE_ID) {
      console.error("No BP image id provided. Cannot save image.");
      return;
    }

    const file = await this._getFile();
    const fd = new FormData();

    fd.append("image", file);
    fd.append("image_id", window.BP_IMAGE_ID);
    fd.append("replace", replace);

    const response = await fetch("/minipaint-images", {
      method: "post",
      body: fd,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        Accept: "application/json",
      },
    });
  }

  /**
   * Create a file object
   *
   * @returns Promise<File>
   */
  async _getFile() {
    return new Promise((resolve, reject) => {
      // Save all layers. See file/save.js:481 if we want only selected layers
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = config.WIDTH;
      canvas.height = config.HEIGHT;

      this.Base_layers.convert_layers_to_canvas(ctx, null, false);

      canvas.toBlob(function (blob) {
        const file = new File([blob], "image.png", { type: "image/png" });
        resolve(file);
      }, "image/png");
    });
  }
}
