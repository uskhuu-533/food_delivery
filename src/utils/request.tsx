export   const fetchCategory = async () => {
    try {
      const response = await fetch(`http://localhost:3000/category`);
      const results = await response.json();
     return results
    } catch (err) {
      console.log(err);
    }
  };