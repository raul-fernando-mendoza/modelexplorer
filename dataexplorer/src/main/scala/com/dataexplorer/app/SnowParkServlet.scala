package com.dataexplorer.app

import org.scalatra._
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json._

import com.snowflake.snowpark._
import com.snowflake.snowpark.functions._
import com.snowflake.snowpark.Row

import scala.collection.mutable.ListBuffer
import scala.collection.mutable.ArrayBuffer


class SnowParkServlet extends ScalatraServlet with JacksonJsonSupport
{
 protected implicit lazy val jsonFormats: Formats = DefaultFormats

  before() {
    contentType = formats("json")
  }

  get("/") {
    val configs = Map (
                "USER" -> "rmendoza@24hourfit.com", 
                "URL" -> "twentyfourhourfit.east-us-2.azure.snowflakecomputing.com:443", 
                "WAREHOUSE" -> "LOAD_WH", 
                "ROLE" -> "DA_ANALYTICS_RO_NP" ,
                "AUTHENTICATOR" -> "externalbrowser",
                "DATABASE" -> "DA_DEV",
                "SCHEMA" -> "DA_DW"
    )
    val session = Session.builder.configs(configs).create
    val df = session.table("da_dev.da_dw.DIM_CLUB")
    val rows = df.select(col("CLUB_ID"),col("CLUB_SRC_NUM")).first(100)

    var results = ArrayBuffer[Any]()

    rows.foreach( r => println( r ) )
    rows.foreach( r => results += r.toSeq ) 

    results
  }

}
