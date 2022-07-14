package com.dataexplorer.app

import org.scalatra.test.scalatest._

class DataExplorerServletTests extends ScalatraFunSuite {

  addServlet(classOf[DataExplorerServlet], "/*")

  test("GET / on DataExplorerServlet should return status 200") {
    get("/") {
      status should equal (200)
    }
  }

}
