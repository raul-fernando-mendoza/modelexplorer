import com.snowflake.snowpark._
import com.snowflake.snowpark.functions._
object MainDataframe extends App {
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
    val df = session.table("im_prd.dw_24hr.fact_request_log")
    val result = df.filter(col("REQUEST_LOG_SRC_NUM") === "31174379").select(col("REQUEST_LOG_SRC_NUM"),col("SUBSCRIPTION_CURR_ID"))

    val df_sc = session.table("im_prd.dw_24hr.dim_subscription_curr")

    val j_result = result.join(df_sc,result.col("SUBSCRIPTION_CURR_ID") === df_sc.col("SUBSCRIPTION_CURR_ID"),"left")
    j_result.select(col("SUBSCRIPTION_CURR_SRC_NUM")).show()


    result.show()
}