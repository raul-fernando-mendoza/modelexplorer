package com.dataexplorer.app

import org.scalatra._
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._

// curl -X POST http://localhost:8080/api/create -H 'Content-Type: application/json' -d '{"title":"examen","desc":"esto es un examen"}'

// curl --header "Content-type: application/json" --request POST --data "{\"symbol\":\"GOOG\", \"price\":600.00}" http://localhost:8080/api/create

case class MyRequest(symbol: String, price: String)

class JsonReceiveServlet extends ScalatraServlet  with JacksonJsonSupport{
   protected implicit lazy val jsonFormats: Formats = DefaultFormats
  post("/create") {
    print( request.body )
    val a = parsedBody.extract[MyRequest]
    print(a)
    a

  }

}
