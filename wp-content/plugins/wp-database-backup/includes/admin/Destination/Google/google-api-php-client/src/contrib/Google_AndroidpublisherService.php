<?php
/*
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */


  /**
   * The "***REMOVED***" collection of methods.
   * Typical usage is:
   *  <code>
   *   $androidpublisherService = new Google_AndroidPublisherService(...);
   *   $***REMOVED*** = $androidpublisherService->***REMOVED***;
   *  </code>
   */
  class Google_InapppurchasesServiceResource extends Google_ServiceResource {

    /**
     * Checks the purchase and consumption status of an inapp item. (***REMOVED***.get)
     *
     * @param string $packageName The package name of the application the inapp product was sold in (for example, 'com.some.thing').
     * @param string $productId The inapp product SKU (for example, 'com.some.thing.inapp1').
     * @param string $token The token provided to the user's device when the inapp product was purchased.
     * @param array $optParams Optional parameters.
     * @return Google_InappPurchase
     */
    public function get($packageName, $productId, $token, $optParams = array()) {
      $params = array('packageName' => $packageName, 'productId' => $productId, 'token' => $token);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_InappPurchase($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "purchases" collection of methods.
   * Typical usage is:
   *  <code>
   *   $androidpublisherService = new Google_AndroidPublisherService(...);
   *   $purchases = $androidpublisherService->purchases;
   *  </code>
   */
  class Google_PurchasesServiceResource extends Google_ServiceResource {

    /**
     * Cancels a user's subscription purchase. The subscription remains valid until its expiration time.
     * (purchases.cancel)
     *
     * @param string $packageName The package name of the application for which this subscription was purchased (for example, 'com.some.thing').
     * @param string $***REMOVED*** The purchased subscription ID (for example, 'monthly001').
     * @param string $token The token provided to the user's device when the subscription was purchased.
     * @param array $optParams Optional parameters.
     */
    public function cancel($packageName, $***REMOVED***, $token, $optParams = array()) {
      $params = array('packageName' => $packageName, '***REMOVED***' => $***REMOVED***, 'token' => $token);
      $params = array_merge($params, $optParams);
      $data = $this->__call('cancel', array($params));
      return $data;
    }
    /**
     * Checks whether a user's subscription purchase is valid and returns its expiry time.
     * (purchases.get)
     *
     * @param string $packageName The package name of the application for which this subscription was purchased (for example, 'com.some.thing').
     * @param string $***REMOVED*** The purchased subscription ID (for example, 'monthly001').
     * @param string $token The token provided to the user's device when the subscription was purchased.
     * @param array $optParams Optional parameters.
     * @return Google_SubscriptionPurchase
     */
    public function get($packageName, $***REMOVED***, $token, $optParams = array()) {
      $params = array('packageName' => $packageName, '***REMOVED***' => $***REMOVED***, 'token' => $token);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_SubscriptionPurchase($data);
      } else {
        return $data;
      }
    }
  }

/**
 * Service definition for Google_AndroidPublisher (v1.1).
 *
 * <p>
 * Lets Android application developers access their Google Play accounts.
 * </p>
 *
 * <p>
 * For more information about this service, see the
 * <a href="https://developers.google.com/android-publisher" target="_blank">API Documentation</a>
 * </p>
 *
 * @author Google, Inc.
 */
class Google_AndroidPublisherService extends Google_Service {
  public $***REMOVED***;
  public $purchases;
  /**
   * Constructs the internal ***REMOVED*** of the ***REMOVED*** service.
   *
   * @param Google_Client $client
   */
  public function __construct(Google_Client $client) {
    $this->servicePath = '***REMOVED***/v1.1/applications/';
    $this->version = 'v1.1';
    $this->serviceName = '***REMOVED***';

    $client->addService($this->serviceName, $this->version);
    $this->***REMOVED*** = new Google_InapppurchasesServiceResource($this, $this->serviceName, '***REMOVED***', json_decode('{"methods": {"get": {"id": "***REMOVED***.***REMOVED***.get", "path": "{packageName}/inapp/{productId}/purchases/{token}", "httpMethod": "GET", "parameters": {"packageName": {"type": "string", "required": true, "location": "path"}, "productId": {"type": "string", "required": true, "location": "path"}, "token": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "InappPurchase"}}}}', true));
    $this->purchases = new Google_PurchasesServiceResource($this, $this->serviceName, 'purchases', json_decode('{"methods": {"cancel": {"id": "***REMOVED***.purchases.cancel", "path": "{packageName}/subscriptions/{***REMOVED***}/purchases/{token}/cancel", "httpMethod": "POST", "parameters": {"packageName": {"type": "string", "required": true, "location": "path"}, "***REMOVED***": {"type": "string", "required": true, "location": "path"}, "token": {"type": "string", "required": true, "location": "path"}}}, "get": {"id": "***REMOVED***.purchases.get", "path": "{packageName}/subscriptions/{***REMOVED***}/purchases/{token}", "httpMethod": "GET", "parameters": {"packageName": {"type": "string", "required": true, "location": "path"}, "***REMOVED***": {"type": "string", "required": true, "location": "path"}, "token": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "***REMOVED***"}}}}', true));

  }
}



class Google_InappPurchase extends Google_Model {
  public $***REMOVED***;
  public $***REMOVED***;
  public $kind;
  public $purchaseState;
  public $purchaseTime;
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function ***REMOVED***( $purchaseState) {
    $this->purchaseState = $purchaseState;
  }
  public function ***REMOVED***() {
    return $this->purchaseState;
  }
  public function ***REMOVED***( $purchaseTime) {
    $this->purchaseTime = $purchaseTime;
  }
  public function ***REMOVED***() {
    return $this->purchaseTime;
  }
}

class Google_SubscriptionPurchase extends Google_Model {
  public $autoRenewing;
  public $initiationTimestampMsec;
  public $kind;
  public $validUntilTimestampMsec;
  public function ***REMOVED***( $autoRenewing) {
    $this->autoRenewing = $autoRenewing;
  }
  public function ***REMOVED***() {
    return $this->autoRenewing;
  }
  public function setInitiationTimestampMsec( $initiationTimestampMsec) {
    $this->initiationTimestampMsec = $initiationTimestampMsec;
  }
  public function getInitiationTimestampMsec() {
    return $this->initiationTimestampMsec;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setValidUntilTimestampMsec( $validUntilTimestampMsec) {
    $this->validUntilTimestampMsec = $validUntilTimestampMsec;
  }
  public function getValidUntilTimestampMsec() {
    return $this->validUntilTimestampMsec;
  }
}
