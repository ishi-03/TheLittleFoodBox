const image = req.file
  ? `/uploads/${req.file.filename}`
  : "";

const salad = await Salad.create({
  ...req.body,
  image,
});