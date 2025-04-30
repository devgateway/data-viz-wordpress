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
   * The "customers" collection of methods.
   * Typical usage is:
   *  <code>
   *   $***REMOVED*** = new Google_ResellerService(...);
   *   $customers = $***REMOVED***->customers;
   *  </code>
   */
  class Google_CustomersServiceResource extends Google_ServiceResource {

    /**
     * Gets a customer resource if one exists and is owned by the reseller. (customers.get)
     *
     * @param string $customerId Id of the Customer
     * @param array $optParams Optional parameters.
     * @return Google_Customer
     */
    public function get($customerId, $optParams = array()) {
      $params = array('customerId' => $customerId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Customer($data);
      } else {
        return $data;
      }
    }
    /**
     * Creates a customer resource if one does not already exist. (customers.insert)
     *
     * @param Google_Customer $postBody
     * @param array $optParams Optional parameters.
     *
     * @opt_param string ***REMOVED*** An auth token needed for inserting a customer for which domain already exists. Can be generated at https://www.google.com/a/cpanel//TransferToken. Optional.
     * @return Google_Customer
     */
    public function insert(Google_Customer $postBody, $optParams = array()) {
      $params = array('postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('insert', array($params));
      if ($this->useObjects()) {
        return new Google_Customer($data);
      } else {
        return $data;
      }
    }
    /**
     * Update a customer resource if one it exists and is owned by the reseller. This method supports
     * patch semantics. (customers.patch)
     *
     * @param string $customerId Id of the Customer
     * @param Google_Customer $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Customer
     */
    public function patch($customerId, Google_Customer $postBody, $optParams = array()) {
      $params = array('customerId' => $customerId, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('patch', array($params));
      if ($this->useObjects()) {
        return new Google_Customer($data);
      } else {
        return $data;
      }
    }
    /**
     * Update a customer resource if one it exists and is owned by the reseller. (customers.update)
     *
     * @param string $customerId Id of the Customer
     * @param Google_Customer $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Customer
     */
    public function update($customerId, Google_Customer $postBody, $optParams = array()) {
      $params = array('customerId' => $customerId, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('update', array($params));
      if ($this->useObjects()) {
        return new Google_Customer($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "subscriptions" collection of methods.
   * Typical usage is:
   *  <code>
   *   $***REMOVED*** = new Google_ResellerService(...);
   *   $subscriptions = $***REMOVED***->subscriptions;
   *  </code>
   */
  class Google_SubscriptionsServiceResource extends Google_ServiceResource {

    /**
     * Changes the plan of a subscription (subscriptions.changePlan)
     *
     * @param string $customerId Id of the Customer
     * @param string $***REMOVED*** Id of the subscription, which is unique for a customer
     * @param Google_ChangePlanRequest $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Subscription
     */
    public function changePlan($customerId, $***REMOVED***, Google_ChangePlanRequest $postBody, $optParams = array()) {
      $params = array('customerId' => $customerId, '***REMOVED***' => $***REMOVED***, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('changePlan', array($params));
      if ($this->useObjects()) {
        return new Google_Subscription($data);
      } else {
        return $data;
      }
    }
    /**
     * Changes the renewal settings of a subscription (subscriptions.changeRenewalSettings)
     *
     * @param string $customerId Id of the Customer
     * @param string $***REMOVED*** Id of the subscription, which is unique for a customer
     * @param Google_RenewalSettings $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Subscription
     */
    public function changeRenewalSettings($customerId, $***REMOVED***, Google_RenewalSettings $postBody, $optParams = array()) {
      $params = array('customerId' => $customerId, '***REMOVED***' => $***REMOVED***, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('changeRenewalSettings', array($params));
      if ($this->useObjects()) {
        return new Google_Subscription($data);
      } else {
        return $data;
      }
    }
    /**
     * Changes the seats configuration of a subscription (subscriptions.changeSeats)
     *
     * @param string $customerId Id of the Customer
     * @param string $***REMOVED*** Id of the subscription, which is unique for a customer
     * @param Google_Seats $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Subscription
     */
    public function changeSeats($customerId, $***REMOVED***, Google_Seats $postBody, $optParams = array()) {
      $params = array('customerId' => $customerId, '***REMOVED***' => $***REMOVED***, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('changeSeats', array($params));
      if ($this->useObjects()) {
        return new Google_Subscription($data);
      } else {
        return $data;
      }
    }
    /**
     * Cancels/Downgrades a subscription. (subscriptions.delete)
     *
     * @param string $customerId Id of the Customer
     * @param string $***REMOVED*** Id of the subscription, which is unique for a customer
     * @param string $deletionType Whether the subscription is to be fully cancelled or downgraded
     * @param array $optParams Optional parameters.
     */
    public function delete($customerId, $***REMOVED***, $deletionType, $optParams = array()) {
      $params = array('customerId' => $customerId, '***REMOVED***' => $***REMOVED***, 'deletionType' => $deletionType);
      $params = array_merge($params, $optParams);
      $data = $this->__call('delete', array($params));
      return $data;
    }
    /**
     * Gets a subscription of the customer. (subscriptions.get)
     *
     * @param string $customerId Id of the Customer
     * @param string $***REMOVED*** Id of the subscription, which is unique for a customer
     * @param array $optParams Optional parameters.
     * @return Google_Subscription
     */
    public function get($customerId, $***REMOVED***, $optParams = array()) {
      $params = array('customerId' => $customerId, '***REMOVED***' => $***REMOVED***);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Subscription($data);
      } else {
        return $data;
      }
    }
    /**
     * Creates/Transfers a subscription for the customer. (subscriptions.insert)
     *
     * @param string $customerId Id of the Customer
     * @param Google_Subscription $postBody
     * @param array $optParams Optional parameters.
     *
     * @opt_param string ***REMOVED*** An auth token needed for transferring a subscription. Can be generated at https://www.google.com/a/cpanel/customer-domain/TransferToken. Optional.
     * @return Google_Subscription
     */
    public function insert($customerId, Google_Subscription $postBody, $optParams = array()) {
      $params = array('customerId' => $customerId, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('insert', array($params));
      if ($this->useObjects()) {
        return new Google_Subscription($data);
      } else {
        return $data;
      }
    }
    /**
     * Lists subscriptions of a reseller, optionally filtered by a customer name prefix.
     * (subscriptions.list)
     *
     * @param array $optParams Optional parameters.
     *
     * @opt_param string ***REMOVED*** An auth token needed if the customer is not a resold customer of this reseller. Can be generated at https://www.google.com/a/cpanel/customer-domain/TransferToken.Optional.
     * @opt_param string customerId Id of the Customer
     * @opt_param string ***REMOVED*** Prefix of the customer's domain name by which the subscriptions should be filtered. Optional
     * @opt_param string maxResults Maximum number of results to return
     * @opt_param string pageToken Token to specify next page in the list
     * @return Google_Subscriptions
     */
    public function ***REMOVED***($optParams = array()) {
      $params = array();
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Subscriptions($data);
      } else {
        return $data;
      }
    }
    /**
     * Starts paid service of a trial subscription (subscriptions.***REMOVED***)
     *
     * @param string $customerId Id of the Customer
     * @param string $***REMOVED*** Id of the subscription, which is unique for a customer
     * @param array $optParams Optional parameters.
     * @return Google_Subscription
     */
    public function ***REMOVED***($customerId, $***REMOVED***, $optParams = array()) {
      $params = array('customerId' => $customerId, '***REMOVED***' => $***REMOVED***);
      $params = array_merge($params, $optParams);
      $data = $this->__call('***REMOVED***', array($params));
      if ($this->useObjects()) {
        return new Google_Subscription($data);
      } else {
        return $data;
      }
    }
  }

/**
 * Service definition for Google_Reseller (v1).
 *
 * <p>
 * Lets you create and manage your customers and their subscriptions.
 * </p>
 *
 * <p>
 * For more information about this service, see the
 * <a href="https://developers.google.com/google-apps/reseller/" target="_blank">API Documentation</a>
 * </p>
 *
 * @author Google, Inc.
 */
class Google_ResellerService extends Google_Service {
  public $customers;
  public $subscriptions;
  /**
   * Constructs the internal ***REMOVED*** of the Reseller service.
   *
   * @param Google_Client $client
   */
  public function __construct(Google_Client $client) {
    $this->servicePath = 'apps/reseller/v1/';
    $this->version = 'v1';
    $this->serviceName = 'reseller';

    $client->addService($this->serviceName, $this->version);
    $this->customers = new Google_CustomersServiceResource($this, $this->serviceName, 'customers', json_decode('{"methods": {"get": {"id": "reseller.customers.get", "path": "customers/{customerId}", "httpMethod": "GET", "parameters": {"customerId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Customer"}}, "insert": {"id": "reseller.customers.insert", "path": "customers", "httpMethod": "POST", "parameters": {"***REMOVED***": {"type": "string", "location": "query"}}, "request": {"$ref": "Customer"}, "response": {"$ref": "Customer"}}, "patch": {"id": "reseller.customers.patch", "path": "customers/{customerId}", "httpMethod": "PATCH", "parameters": {"customerId": {"type": "string", "required": true, "location": "path"}}, "request": {"$ref": "Customer"}, "response": {"$ref": "Customer"}}, "update": {"id": "reseller.customers.update", "path": "customers/{customerId}", "httpMethod": "PUT", "parameters": {"customerId": {"type": "string", "required": true, "location": "path"}}, "request": {"$ref": "Customer"}, "response": {"$ref": "Customer"}}}}', true));
    $this->subscriptions = new Google_SubscriptionsServiceResource($this, $this->serviceName, 'subscriptions', json_decode('{"methods": {"changePlan": {"id": "reseller.subscriptions.changePlan", "path": "customers/{customerId}/subscriptions/{***REMOVED***}/changePlan", "httpMethod": "POST", "parameters": {"customerId": {"type": "string", "required": true, "location": "path"}, "***REMOVED***": {"type": "string", "required": true, "location": "path"}}, "request": {"$ref": "***REMOVED***"}, "response": {"$ref": "Subscription"}}, "changeRenewalSettings": {"id": "reseller.subscriptions.changeRenewalSettings", "path": "customers/{customerId}/subscriptions/{***REMOVED***}/changeRenewalSettings", "httpMethod": "POST", "parameters": {"customerId": {"type": "string", "required": true, "location": "path"}, "***REMOVED***": {"type": "string", "required": true, "location": "path"}}, "request": {"$ref": "***REMOVED***"}, "response": {"$ref": "Subscription"}}, "changeSeats": {"id": "reseller.subscriptions.changeSeats", "path": "customers/{customerId}/subscriptions/{***REMOVED***}/changeSeats", "httpMethod": "POST", "parameters": {"customerId": {"type": "string", "required": true, "location": "path"}, "***REMOVED***": {"type": "string", "required": true, "location": "path"}}, "request": {"$ref": "Seats"}, "response": {"$ref": "Subscription"}}, "delete": {"id": "reseller.subscriptions.delete", "path": "customers/{customerId}/subscriptions/{***REMOVED***}", "httpMethod": "DELETE", "parameters": {"customerId": {"type": "string", "required": true, "location": "path"}, "deletionType": {"type": "string", "required": true, "enum": ["cancel", "downgrade", "suspend"], "location": "query"}, "***REMOVED***": {"type": "string", "required": true, "location": "path"}}}, "get": {"id": "reseller.subscriptions.get", "path": "customers/{customerId}/subscriptions/{***REMOVED***}", "httpMethod": "GET", "parameters": {"customerId": {"type": "string", "required": true, "location": "path"}, "***REMOVED***": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Subscription"}}, "insert": {"id": "reseller.subscriptions.insert", "path": "customers/{customerId}/subscriptions", "httpMethod": "POST", "parameters": {"***REMOVED***": {"type": "string", "location": "query"}, "customerId": {"type": "string", "required": true, "location": "path"}}, "request": {"$ref": "Subscription"}, "response": {"$ref": "Subscription"}}, "list": {"id": "reseller.subscriptions.list", "path": "subscriptions", "httpMethod": "GET", "parameters": {"***REMOVED***": {"type": "string", "location": "query"}, "customerId": {"type": "string", "location": "query"}, "***REMOVED***": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "1", "maximum": "100", "location": "query"}, "pageToken": {"type": "string", "location": "query"}}, "response": {"$ref": "Subscriptions"}}, "***REMOVED***": {"id": "reseller.subscriptions.***REMOVED***", "path": "customers/{customerId}/subscriptions/{***REMOVED***}/***REMOVED***", "httpMethod": "POST", "parameters": {"customerId": {"type": "string", "required": true, "location": "path"}, "***REMOVED***": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Subscription"}}}}', true));

  }
}



class Google_Address extends Google_Model {
  public $addressLine1;
  public $addressLine2;
  public $addressLine3;
  public $contactName;
  public $countryCode;
  public $kind;
  public $locality;
  public $***REMOVED***;
  public $postalCode;
  public $region;
  public function ***REMOVED***( $addressLine1) {
    $this->addressLine1 = $addressLine1;
  }
  public function ***REMOVED***() {
    return $this->addressLine1;
  }
  public function ***REMOVED***( $addressLine2) {
    $this->addressLine2 = $addressLine2;
  }
  public function ***REMOVED***() {
    return $this->addressLine2;
  }
  public function ***REMOVED***( $addressLine3) {
    $this->addressLine3 = $addressLine3;
  }
  public function ***REMOVED***() {
    return $this->addressLine3;
  }
  public function ***REMOVED***( $contactName) {
    $this->contactName = $contactName;
  }
  public function ***REMOVED***() {
    return $this->contactName;
  }
  public function ***REMOVED***( $countryCode) {
    $this->countryCode = $countryCode;
  }
  public function ***REMOVED***() {
    return $this->countryCode;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setLocality( $locality) {
    $this->locality = $locality;
  }
  public function getLocality() {
    return $this->locality;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setPostalCode( $postalCode) {
    $this->postalCode = $postalCode;
  }
  public function getPostalCode() {
    return $this->postalCode;
  }
  public function setRegion( $region) {
    $this->region = $region;
  }
  public function getRegion() {
    return $this->region;
  }
}

class Google_ChangePlanRequest extends Google_Model {
  public $kind;
  public $planName;
  public $***REMOVED***;
  protected $__seatsType = 'Google_Seats';
  protected $__seatsDataType = '';
  public $seats;
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setPlanName( $planName) {
    $this->planName = $planName;
  }
  public function getPlanName() {
    return $this->planName;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setSeats(Google_Seats $seats) {
    $this->seats = $seats;
  }
  public function getSeats() {
    return $this->seats;
  }
}

class Google_Customer extends Google_Model {
  public $***REMOVED***;
  public $***REMOVED***;
  public $customerId;
  public $kind;
  public $phoneNumber;
  protected $__postalAddressType = 'Google_Address';
  protected $__postalAddressDataType = '';
  public $postalAddress;
  public $resourceUiUrl;
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
  public function setCustomerId( $customerId) {
    $this->customerId = $customerId;
  }
  public function getCustomerId() {
    return $this->customerId;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function ***REMOVED***( $phoneNumber) {
    $this->phoneNumber = $phoneNumber;
  }
  public function ***REMOVED***() {
    return $this->phoneNumber;
  }
  public function ***REMOVED***(Google_Address $postalAddress) {
    $this->postalAddress = $postalAddress;
  }
  public function ***REMOVED***() {
    return $this->postalAddress;
  }
  public function ***REMOVED***( $resourceUiUrl) {
    $this->resourceUiUrl = $resourceUiUrl;
  }
  public function ***REMOVED***() {
    return $this->resourceUiUrl;
  }
}

class Google_RenewalSettings extends Google_Model {
  public $kind;
  public $renewalType;
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function ***REMOVED***( $renewalType) {
    $this->renewalType = $renewalType;
  }
  public function ***REMOVED***() {
    return $this->renewalType;
  }
}

class Google_Seats extends Google_Model {
  public $kind;
  public $***REMOVED***;
  public $numberOfSeats;
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setMaximumNumberOfSeats( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getMaximumNumberOfSeats() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $numberOfSeats) {
    $this->numberOfSeats = $numberOfSeats;
  }
  public function ***REMOVED***() {
    return $this->numberOfSeats;
  }
}

class Google_Subscription extends Google_Model {
  public $creationTime;
  public $customerId;
  public $kind;
  protected $__planType = 'Google_SubscriptionPlan';
  protected $__planDataType = '';
  public $plan;
  public $***REMOVED***;
  protected $__renewalSettingsType = 'Google_RenewalSettings';
  protected $__renewalSettingsDataType = '';
  public $***REMOVED***;
  public $resourceUiUrl;
  protected $__seatsType = 'Google_Seats';
  protected $__seatsDataType = '';
  public $seats;
  public $skuId;
  public $status;
  public $***REMOVED***;
  protected $__transferInfoType = 'Google_SubscriptionTransferInfo';
  protected $__transferInfoDataType = '';
  public $transferInfo;
  protected $__trialSettingsType = 'Google_SubscriptionTrialSettings';
  protected $__trialSettingsDataType = '';
  public $trialSettings;
  public function ***REMOVED***( $creationTime) {
    $this->creationTime = $creationTime;
  }
  public function ***REMOVED***() {
    return $this->creationTime;
  }
  public function setCustomerId( $customerId) {
    $this->customerId = $customerId;
  }
  public function getCustomerId() {
    return $this->customerId;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setPlan(Google_SubscriptionPlan $plan) {
    $this->plan = $plan;
  }
  public function getPlan() {
    return $this->plan;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(Google_RenewalSettings $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $resourceUiUrl) {
    $this->resourceUiUrl = $resourceUiUrl;
  }
  public function ***REMOVED***() {
    return $this->resourceUiUrl;
  }
  public function setSeats(Google_Seats $seats) {
    $this->seats = $seats;
  }
  public function getSeats() {
    return $this->seats;
  }
  public function setSkuId( $skuId) {
    $this->skuId = $skuId;
  }
  public function getSkuId() {
    return $this->skuId;
  }
  public function setStatus( $status) {
    $this->status = $status;
  }
  public function getStatus() {
    return $this->status;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(Google_SubscriptionTransferInfo $transferInfo) {
    $this->transferInfo = $transferInfo;
  }
  public function ***REMOVED***() {
    return $this->transferInfo;
  }
  public function ***REMOVED***(Google_SubscriptionTrialSettings $trialSettings) {
    $this->trialSettings = $trialSettings;
  }
  public function ***REMOVED***() {
    return $this->trialSettings;
  }
}

class Google_SubscriptionPlan extends Google_Model {
  protected $__commitmentIntervalType = 'Google_SubscriptionPlanCommitmentInterval';
  protected $__commitmentIntervalDataType = '';
  public $***REMOVED***;
  public $***REMOVED***;
  public $planName;
  public function setCommitmentInterval(Google_SubscriptionPlanCommitmentInterval $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getCommitmentInterval() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setPlanName( $planName) {
    $this->planName = $planName;
  }
  public function getPlanName() {
    return $this->planName;
  }
}

class Google_SubscriptionPlanCommitmentInterval extends Google_Model {
  public $endTime;
  public $startTime;
  public function setEndTime( $endTime) {
    $this->endTime = $endTime;
  }
  public function getEndTime() {
    return $this->endTime;
  }
  public function setStartTime( $startTime) {
    $this->startTime = $startTime;
  }
  public function getStartTime() {
    return $this->startTime;
  }
}

class Google_SubscriptionTransferInfo extends Google_Model {
  public $transferabilityExpirationTime;
  public function setTransferabilityExpirationTime( $transferabilityExpirationTime) {
    $this->transferabilityExpirationTime = $transferabilityExpirationTime;
  }
  public function getTransferabilityExpirationTime() {
    return $this->transferabilityExpirationTime;
  }
}

class Google_SubscriptionTrialSettings extends Google_Model {
  public $isInTrial;
  public $trialEndTime;
  public function setIsInTrial( $isInTrial) {
    $this->isInTrial = $isInTrial;
  }
  public function getIsInTrial() {
    return $this->isInTrial;
  }
  public function ***REMOVED***( $trialEndTime) {
    $this->trialEndTime = $trialEndTime;
  }
  public function ***REMOVED***() {
    return $this->trialEndTime;
  }
}

class Google_Subscriptions extends Google_Model {
  public $kind;
  public $nextPageToken;
  protected $__subscriptionsType = 'Google_Subscription';
  protected $__subscriptionsDataType = 'array';
  public $subscriptions;
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function ***REMOVED***( $nextPageToken) {
    $this->nextPageToken = $nextPageToken;
  }
  public function ***REMOVED***() {
    return $this->nextPageToken;
  }
  public function ***REMOVED***(/* array(Google_Subscription) */ $subscriptions) {
    $this->assertIsArray($subscriptions, 'Google_Subscription', __METHOD__);
    $this->subscriptions = $subscriptions;
  }
  public function ***REMOVED***() {
    return $this->subscriptions;
  }
}
