import Combine
import CoreData
import Foundation
import Models
import SwiftGraphQL

public extension DataService {
  func labelsPublisher() -> AnyPublisher<[NSManagedObjectID], ServerError> {
    enum QueryResult {
      case success(result: [InternalLinkedItemLabel])
      case error(error: String)
    }

    let selection = Selection<QueryResult, Unions.LabelsResult> {
      try $0.on(labelsSuccess: .init {
        QueryResult.success(result: try $0.labels(selection: feedItemLabelSelection.list))
      },
      labelsError: .init {
        QueryResult.error(error: try $0.errorCodes().description)
      })
    }

    let query = Selection.Query {
      try $0.labels(selection: selection)
    }

    let path = appEnvironment.graphqlPath
    let headers = networker.defaultHeaders

    return Deferred {
      Future { promise in
        send(query, to: path, headers: headers) { result in
          switch result {
          case let .success(payload):
            switch payload.data {
            case let .success(result: result):
              // TODO: -labels update CoreData and fix this
//              promise(.success(result))
              promise(.failure(.unknown))
            case .error:
              promise(.failure(.unknown))
            }
          case .failure:
            promise(.failure(.unknown))
          }
        }
      }
    }
    .receive(on: DispatchQueue.main)
    .eraseToAnyPublisher()
  }
}
