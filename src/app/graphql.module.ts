// import { NgModule, Injectable } from "@angular/core";
// import { HttpClient, HttpClientModule } from "@angular/common/http";

// import { HttpLink, HttpOptions } from "@apollo/client/link/http";

// // Apollo
// import { ApolloModule, APOLLO_OPTIONS } from "apollo-angular";
// import { ApolloClientOptions, InMemoryCache } from "@apollo/client/core";
// // import { Options } from "apollo-angular/http";

// const uri = "http://localhost:4000/";

// @Injectable({
//   providedIn: "root",
// })
// export class InjectableHttpLink {
//   constructor(private httpClient: HttpClient) {}

//   public create(options: HttpOptions): HttpLink {
//     return new HttpLink(options);
//   }
// }

// function createApollo(httpLink: InjectableHttpLink): ApolloClientOptions<any> {
//   return {
//     link: httpLink.create({ uri }),
//     cache: new InMemoryCache(),
//   };
// }

// @NgModule({
//   exports: [ApolloModule, HttpClientModule],
//   providers: [
//     {
//       provide: APOLLO_OPTIONS,
//       useFactory: createApollo,
//       deps: [InjectableHttpLink], // should this be plain HttpLink?
//     },
//   ],
// })
// export class GraphQLModule {}

import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { HttpLink } from "apollo-angular/http";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ApolloClientOptions, InMemoryCache } from "@apollo/client/core";

const uri = "http://localhost:4000/";
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

// export function apolloClientFactory = () => new

@NgModule({
  exports: [ApolloModule, HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
