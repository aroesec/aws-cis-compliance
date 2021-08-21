import boto3
iam = boto3.client('iam')


def handler(event,context):
  updatePolicy()

def updatePolicy():
    try:

      response = iam.update_account_password_policy(
        MinimumPasswordLength=17,
        RequireSymbols=True,
        RequireNumbers=True,
        RequireUppercaseCharacters=True,
        RequireLowercaseCharacters=True,
        AllowUsersToChangePassword=True,
        MaxPasswordAge=90,
        PasswordReusePrevention=24,
        HardExpiry=False #TODO can set this to True if needed
        
      )
      print(response)
      return response
    

    except Exception as e:
      print(e)
      return (False, "Cannot update policy: " + str(e))