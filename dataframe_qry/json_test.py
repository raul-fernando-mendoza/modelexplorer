from snowflake_connect import SnowFlakeConnection
import pandas as pd
from snowflake.connector.pandas_tools import write_pandas
import pandas as pd

s = SnowFlakeConnection()

json = {
    "im_prd.dw_24hr.fact_request_log":{
        "request_log_src_num":None,
       # "day_id":"between(20210101,20210102)",
        "subscription_curr_id":None,
        "REQUEST_LOG_TYPE_ID":None,
        "freeze_start_date":None,
        "im_prd.dw_24hr.dim_subscription_curr":{
            "SUBSCRIPTION_CURR_ID":"parent.SUBSCRIPTION_CURR_ID",
            "SUBSCRIPTION_CURR_SRC_NUM":None
        }
    }
}


df = s.json_query(json, s.getPRD() ).query("FREEZE_START_DATE != None")
print(df.get(['REQUEST_LOG_SRC_NUM','REQUEST_LOG_TYPE_ID','FREEZE_START_DATE','SUBSCRIPTION_CURR_SRC_NUM']).head(5))