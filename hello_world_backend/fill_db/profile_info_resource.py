from http_client import HTTPClient

class ProfileInfoResource:

    def get_profile_info_list_url():
        return "/profile/"

    def retrieve_profile_info(token):
            response = HTTPClient.get(
                ProfileInfoResource.get_profile_info_list_url(), token)
            return response.json()['results'][0]

    def update_profile_info_user_type(token, user_type):
        profile_info = ProfileInfoResource.retrieve_profile_info(token)
        url = profile_info['url']
        HTTPClient.patch(url, {'user_type':user_type}, token)