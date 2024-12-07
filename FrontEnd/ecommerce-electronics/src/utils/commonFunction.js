// commonFunction.js

// Lưu accessToken vào localStorage
export const saveAccessToken = (token) => {
  if (token) {
    localStorage.setItem('accessToken', token);
  }
};

// Lấy accessToken từ localStorage
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Xóa accessToken khỏi localStorage
export const removeAccessToken = () => {
  localStorage.removeItem('accessToken');
};

// Kiểm tra xem accessToken có tồn tại trong localStorage hay không
export const checkAccessToken = () => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    return true;
  } else {
    return false;
  }
};

export const saveCategories = (categories) => {
  if (categories) {
    localStorage.setItem('categories', categories);
  }
}
export const getCategories = () => {
  return localStorage.getItem('categories');
}
export const saveProducts = (products) => {

  localStorage.setItem('products', products);

}
export const getProducts = () => {
  return localStorage.getItem('products');
}


// Lưu cartBuy vào localStorage
export const saveCartBuy = (cartBuy) => {
  if (cartBuy && Array.isArray(cartBuy)) {
    localStorage.setItem('cartBuy', JSON.stringify(cartBuy));
  }
};

// Lấy cartBuy từ localStorage
export const getCartBuy = () => {
  const cartBuy = localStorage.getItem('cartBuy');
  return cartBuy ? JSON.parse(cartBuy) : [];
};

// Xóa cartBuy khỏi localStorage
export const removeCartBuy = () => {
  localStorage.removeItem('cartBuy');
};

