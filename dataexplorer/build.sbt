val ScalatraVersion = "2.8.2"

ThisBuild / scalaVersion := "2.12.9"
ThisBuild / organization := "com.dataexplorer"

lazy val hello = (project in file("."))
  .settings(
    name := "dataexplorer",
    version := "0.1",
    libraryDependencies ++= Seq(
      "org.scalatra" %% "scalatra" % ScalatraVersion,
      "org.scalatra" %% "scalatra-scalatest" % ScalatraVersion % "test",
      "ch.qos.logback" % "logback-classic" % "1.2.3" % "runtime",
      "org.eclipse.jetty" % "jetty-webapp" % "9.4.35.v20201120" % "container",
      "javax.servlet" % "javax.servlet-api" % "3.1.0" % "provided",
      "org.scalatra" %% "scalatra-json" % "2.8.2",
      "org.json4s"   %% "json4s-jackson" % "4.0.1",  
      "com.snowflake" % "snowpark" % "1.3.0"   
    ),
  )

enablePlugins(SbtTwirl)
enablePlugins(JettyPlugin)
