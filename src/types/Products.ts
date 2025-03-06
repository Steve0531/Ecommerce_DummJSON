
export interface IProduct {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
      createdAt: string;
      updatedAt: string;
      barcode: string;
      qrCode: string;
    };
    thumbnail: string;
    images: string[];
  }

export interface IReview {
  reviewerName: string;
  date: string;
  rating: number;
  comment: string;
}

export interface IUserDetails {
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  email : string | null;
  gender : string | null;
}


export interface ICartProduct {
    id: number;
    title: string;
    price: number;
    quantity: number;
    total: number;
    discountPercentage: number;
    discountedTotal: number;
    thumbnail: string;
}
  
export interface ICart {
    id: number;
    products: ICartProduct[];
    total: number;
    discountedTotal: number;
    userId: number;
    totalProducts: number;
    totalQuantity: number;
}
  
export interface IPost {
    id: number;
    title: string;
    body: string;
    tags: string[];
    reactions: {
      likes: number;
      dislikes: number;
    };
    views: number;
    userId: number;
}

export interface IUser {
    id: number;
    fullName: string;
    email: string;
    firstName:string;
    lastName:string;
}
  
export interface IComment {
    id: number;
    postId: number;
    body: string;
    user: IUser;
}

export interface ProductForm {
  title: string;
  description: string;
  price: number;
}