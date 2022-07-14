package com.dataexplorer.app

import org.scalatra._

class DataExplorerServlet extends ScalatraServlet {

  get("/") {
    views.html.hello("Monterrey")
  }

}
