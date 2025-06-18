export const upload_image_to_cloudinary = async (file_uri: string): Promise<string> => {
  const data = new FormData();

  data.append('file', {
    uri: file_uri,
    type: 'image/jpeg',
    name: 'upload.jpg',
  } as any);

  data.append('upload_preset', 'ml_default'); // pon aquí el nombre de tu preset
  data.append('cloud_name', 'dssczoogn');

  const res = await fetch('https://api.cloudinary.com/v1_1/dssczoogn/image/upload', {
    method: 'POST',
    body: data,
  });

  const json = await res.json();
  return json.secure_url; // URL directo a la imagen subida
};