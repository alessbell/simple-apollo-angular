// import { products } from "../products";

// @Component({
//   selector: 'app-product-list',
//   templateUrl: './product-list.component.html',
// })
// export class ProductListComponent {
//   products = [...products];

//   share() {
//     window.alert('The product has been shared!');
//   }
// }

////

import { Component, OnInit } from "@angular/core";
import { Apollo, gql } from "apollo-angular";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Product, Query } from "../types";

const DEFERRED_QUERY = gql`
  query TestQuery {
    allProducts {
      ...DimensionsAndVariation @defer
      sku
      id
    }
  }
  fragment DimensionsAndVariation on Product {
    dimensions {
      size
    }
    variation {
      id
      name
    }
  }
`;

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    console.log("here");
    this.products = this.apollo
      .watchQuery<Query>({
        query: DEFERRED_QUERY,
      })
      .valueChanges.pipe(
        map((result) => {
          console.log("here 2");
          return result.data.allProducts;
        })
      );
    console.log(this.products);
  }
}
