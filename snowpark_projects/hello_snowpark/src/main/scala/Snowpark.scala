import com.snowflake.snowpark._
import com.snowflake.snowpark.functions._
object MainSnowPark extends App {
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
    session.sql("select * from da_dev.da_dw.dim_club limit 1").show()
}