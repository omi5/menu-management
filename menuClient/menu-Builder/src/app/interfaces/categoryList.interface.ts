export interface CategoryList {
    _id: string;
    categoryDescription: string;
    categoryId: number;
    categoryImage: string;
    categoryName: string;
    restaurantId: number;
  };

  export interface Category  {
    _id: string;
    restaurantId: number;
    categoryName: string;
    categoryDescription: string;
    categoryImage: string;
    // categoryId: number;
  };
  