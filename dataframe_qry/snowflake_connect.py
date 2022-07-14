import pandas as pd
import numpy as np
#import matplotlib.pyplot as plt
import snowflake.connector
import re


class SnowFlakeConnection():

    raul_user = "rmendoza@24hourfit.com"

    cnn_dev = None
    cnn_qa = None
    cnn_prd = None
    cnn_tra = None

    def read_sql(self,sql, cnn):        
        df = pd.read_sql(sql,cnn) 
        return df

    def getDev(self):
 
        if self.cnn_dev == None:    
            self.cnn_dev = snowflake.connector.connect(
                user=self.raul_user, 
                #password=raul_pass,
                account="twentyfourhourfit.east-us-2.azure", 
                warehouse = "LOAD_WH", 
                role="DA_ANALYTICS_RO_NP" ,
                authenticator="externalbrowser",
                database= "DA_DEV",
                schema="DA_DW"
            )
        return self.cnn_dev

    def getQA(self):  
        if self.cnn_qa == None:  
            self.cnn_qa = snowflake.connector.connect(
                user=self.raul_user, 
                #password=raul_pass,
                account="twentyfourhourfit.east-us-2.azure", 
                warehouse = "LOAD_WH", 
                role="DA_ANALYTICS_RO_NP" ,
                authenticator="externalbrowser",
                database= "DA_QA",
                schema="DA_DW")
        return self.cnn_qa

    def getPRD(self):
        if self.cnn_prd == None:
            self.cnn_prd = snowflake.connector.connect(
                user=self.raul_user, 
                #password=raul_pass,
                account="twentyfourhourfit.east-us-2.azure", 
                warehouse = "LOAD_WH", 
                role="DA_ANALYTICS_RO_PRD" ,
                authenticator="externalbrowser",
                database= "DA_PRD",
                schema="DA_DW")
        return self.cnn_prd

    def getTransformer(self):
        if self.cnn_tra == None:
            self.cnn_tra = snowflake.connector.connect(
                user=self.raul_user, 
                #password=raul_pass,
                account="twentyfourhourfit.east-us-2.azure", 
                warehouse = "LOAD_WH", 
                role="TRANSFORMER_DEV_ADMIN" ,
                authenticator="externalbrowser",
                database= "DA_DEV",
                schema="DA_DW")
        return self.cnn_tra           
    """
        cs = self.cnn_dev.cursor()
        try:
            cs.execute("SELECT current_version()")
            one_row = cs.fetchone()
            one_row[0]
        finally:
            cs.close()    
    """

# receive a json object and retrieve its data in a dataframe 
    # json = {
    #     "fact_request_log":{
    #         "fact_request_log_id":'123',
    #         "request_log_src_num":'123',
    #         "pmt_src_num":5,
    #         "subscription_curr_id",None,
    #         "dim_subscription_curr":{
    #           "subscription_id":"parent.subscription_curr_id",
    #           "subscription_src_num":None       
    #         }
    #     }    
    # }


    def json_query(self, obj, cnn , table_name=None):
        df = None
        if table_name == None:
            for key in obj:    
                tbl_object = obj[key]
                df = self.json_query(tbl_object, cnn, key)
        else:
            fields = ""  
            where = ""
            for key in obj:
                #add the key to the fields to extract
                value = obj[key]
                               
                if fields != "" and isinstance(value,dict) == False:
                    fields += ","
                if isinstance(value,dict) == False:
                    fields += key
                
                #add the values to the where
                
                if value != None and isinstance(value,dict) == False and value.startswith("parent.") == False:
                    if where != "":
                        where += " and "
                    between = re.search(r"between\((.*),(.*)\)", value)
                    gt = re.search(r"gt\((.*)\)", value) 
                    gte = re.search(r"gte\((.*)\)", value)     
                    lt = re.search(r"lt\((.*)\)", value)
                    lte = re.search(r"lte\((.*)\)", value) 
                    if between and between.group(1):
                        where += key + ">=" + between.group(1) + " and " + key + " < " + between.group(2)
                    elif gt and gt.group(1):   
                        where += key + ">" + gt.group(1)
                    elif gte and gte.group(1):   
                        where += key + ">=" + gt.group(1)
                    elif lt and lt.group(1):
                        where += key + "<" + lt.group(1)
                    elif lte and lte.group(1):
                        where += key + "<=" + lt.group(1) 
                    else: 
                        if isinstance(value,str):
                            where += key + " = '" + value + "'"  
                        else:
                            where += key + " = " + value
            query = "select " + fields + " from " + table_name
            if where != "":
                query +=  " where " + where
            print(query)

            df = pd.read_sql(query,cnn )
            
            #the main dataframe has bee retrieved now do the joins
            for key in obj:
                joined_table_name = key
                joined_obj = obj[joined_table_name]
                if joined_obj != None and isinstance(joined_obj,dict) == True:
                    join_df = self.json_query(joined_obj, cnn, joined_table_name)
                    #retrieve joined elements
                    l_fields = []
                    r_fields = []
                    for j_key in joined_obj:
                        j_val = joined_obj[j_key]
                        if j_val and isinstance(j_val,str) and j_val.startswith("parent."):
                            field = j_val[len("parent."):]
                            l_fields.append(field) 
                            r_fields.append(j_key)


                    df = df.merge(
                        join_df
                        ,left_on=l_fields
                        ,right_on=r_fields
                        , how='inner'
                    )


        return df

