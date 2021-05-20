  
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"

export const MAGIC_PUBLIC_KEY = process.env.NEXT_PUBLIC_MAGIC_PUBLIC_KEY || 'pk_test_C7FDCD075A1F5AE6'

export const STRIPE_PK = process.env.NEXT_PUBLIC_STRIPE_PK || 'pk_test_51IlENRGPl474nMY1KNnUz6aNf06DebUehfWTlaIT8Y8zlkfEW45CPd33Bxlevv57AZqKYVU2gyleAPjXLXVV4eqE00Tbw11N4V'

/**
* Given a image object return the proper path to display it
* Provides a default as well
* @param {any} image 
*/
export const fromImageToUrl = (image) => {
  if (!image) {
    return "/vercel.svg"; //Or default image here
  }
  if (image.url.indexOf("/") === 0) {
    //It's a relative url, add API URL
    return `${API_URL}${image.url}`;
  }

  return image.url;
};