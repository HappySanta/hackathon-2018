<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignRequest extends FormRequest
{
    public $groupId;
    public $viewerType;
    public $userId;
    public $appId;

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        $url = $this->header('X-vk-sign', '');
        $launchParameters = self::parseLaunchParametersUrl($url);
        $isValid = self::checkVkAppsParams($launchParameters, config('app.secret'));
        if (!$isValid) {
            if (config('app.env') === "local") {
                $this->appId = (int)config('app.id');
                $this->userId = 1;
                $this->groupId = 0;
                return true;
            }
            return false;
        }
        $this->appId = (int)$launchParameters['vk_app_id'];
        $this->userId = (int)$launchParameters['vk_user_id'];
        $this->groupId = !empty($launchParameters['vk_group_id']) ? (int)$launchParameters['vk_group_id'] : 0;
        return true;

    }

    public static function checkVkAppsParams(array $params, string $secret) {
        $signParams = [];
        foreach ($params as $key => $param) {
            if (strpos($key, 'vk_') !== 0) {
                continue;
            }
            $signParams[$key] = $param;
        }
        ksort($signParams);
        $signParamsQuery = http_build_query($signParams);
        $sign = rtrim(strtr(base64_encode(hash_hmac('sha256', $signParamsQuery, $secret, true)), '+/', '-_'), '=');
        $signFromParams = !empty($params['sign']) ? $params['sign'] : false;
        if (empty($signFromParams)) {
            return false;
        }
        return $sign === $signFromParams;
    }

    public static function parseLaunchParametersUrl($url)
    {
        $query = preg_replace('/^\?/usi', '', $url);
        $params = [];
        parse_str($query, $params);
        return $params;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            //
        ];
    }
}
