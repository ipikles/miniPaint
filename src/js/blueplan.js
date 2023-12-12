export default function bluePlanSetup() {
  // draw_various();

  //console.log("config", window.State.Base_gui.modules);
  const command = window.location.hash;
  // console.log(window.location.hash);
  // console.log(command.substring(1, 5));

  /**
   * On edit command call url open handler from FileOpen class
   * TODO: Handle json files too instead of just images
   */
  if (command.substring(1, 5) === "edit") {
    const fileId = Number(command.substring(6));
    const url = `/attachments/${fileId}`;
    window.FileOpen.file_open_url_handler({ url: url });
  }
}

async function draw_various() {
  console.log("Draw!");
  var Layers = window.Layers;

  //add layer
  var canvas = document.createElement("canvas");
  canvas.width = 50;
  canvas.height = 50;
  var ctx = canvas.getContext("2d");
  cross_X(ctx, 25, 25);
  var params = {
    type: "image",
    data: canvas.toDataURL("image/png"),
    x: 50,
    y: 50,
    width: canvas.width,
    height: canvas.height,
  };
  await Layers.insert(params);

  //add new layer
  var canvas = document.createElement("canvas");
  canvas.width = 400;
  canvas.height = 400;
  var ctx = canvas.getContext("2d");
  cross_X(ctx, 200, 200, null, "#00cc00");
  var params = {
    type: "image",
    data: canvas.toDataURL("image/png"),
    width: canvas.width,
    height: canvas.height,
  };
  await Layers.insert(params);

  //update last layer
  var canvas = Layers.convert_layer_to_canvas(null, true); //no trim
  var ctx = canvas.getContext("2d");
  cross_X(ctx, 300, 300, null, "#00cc00");
  Layers.update_layer_image(canvas);
  //also update layer
  var link = Layers.get_layer();
  link.x = parseInt(canvas.dataset.x);
  link.y = parseInt(canvas.dataset.y);
  link.width = canvas.width;
  link.height = canvas.height;
}

function cross_X(ctx, x, y, size = 20, col = "#ff0000") {
  if (size == null) size = 20;
  x = parseFloat(x);
  y = parseFloat(y);
  size = parseInt(size);
  var lw = parseInt(5);
  ctx.beginPath();
  ctx.moveTo(x - size, y - size);
  ctx.lineTo(x + size, y + size);
  ctx.lineWidth = lw;
  ctx.strokeStyle = col;
  ctx.stroke();
  ctx.moveTo(x + size, y - size);
  ctx.lineTo(x - size, y + size);
  ctx.lineWidth = lw;
  ctx.strokeStyle = col;
  ctx.stroke();
}
