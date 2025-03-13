
export const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  if (e.target.type == "file" && e.target.files) {
    const file = e.target.files[0];
    const formData = new FormData();

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "food12345");

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dqhu3nn3p/auto/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();
        console.log(result);
        return result.secure_url;
      }
    } catch (err) {
      console.log(err);
    }
  }
};
