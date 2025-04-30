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
   * The "activities" collection of methods.
   * Typical usage is:
   *  <code>
   *   $adminService = new Google_ReportsService(...);
   *   $activities = $adminService->activities;
   *  </code>
   */
  class Google_ActivitiesServiceResource extends Google_ServiceResource {

    /**
     * Retrieves a list of activities for a specific customer and application. (activities.list)
     *
     * @param string $userKey Represents the profile id or the user email for which the data should be filtered. When 'all' is specified as the userKey, it returns usageReports for all users.
     * @param string $***REMOVED*** Application name for which the events are to be retrieved.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string ***REMOVED*** IP Address of host where the event was performed. Supports both IPv4 and IPv6 addresses.
     * @opt_param string endTime Return events which occured at or before this time.
     * @opt_param string eventName Name of the event being queried.
     * @opt_param string filters Event parameters in the form [parameter1 name][operator][parameter1 value],[parameter2 name][operator][parameter2 value],...
     * @opt_param int maxResults Number of activity records to be shown in each page.
     * @opt_param string pageToken Token to specify next page.
     * @opt_param string startTime Return events which occured at or after this time.
     * @return Google_Activities
     */
    public function ***REMOVED***($userKey, $***REMOVED***, $optParams = array()) {
      $params = array('userKey' => $userKey, '***REMOVED***' => $***REMOVED***);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Activities($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "***REMOVED***" collection of methods.
   * Typical usage is:
   *  <code>
   *   $adminService = new Google_ReportsService(...);
   *   $***REMOVED*** = $adminService->***REMOVED***;
   *  </code>
   */
  class Google_CustomerUsageReportsServiceResource extends Google_ServiceResource {

    /**
     * Retrieves a report which is a collection of properties / statistics for a specific customer.
     * (***REMOVED***.get)
     *
     * @param string $date Represents the date in yyyy-mm-dd format for which the data is to be fetched.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string pageToken Token to specify next page.
     * @opt_param string parameters Represents the application name, parameter name pairs to fetch in csv as app_name1:param_name1, app_name2:param_name2.
     * @return Google_UsageReports
     */
    public function get($date, $optParams = array()) {
      $params = array('date' => $date);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_UsageReports($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "***REMOVED***" collection of methods.
   * Typical usage is:
   *  <code>
   *   $adminService = new Google_ReportsService(...);
   *   $***REMOVED*** = $adminService->***REMOVED***;
   *  </code>
   */
  class Google_UserUsageReportServiceResource extends Google_ServiceResource {

    /**
     * Retrieves a report which is a collection of properties / statistics for a set of users.
     * (***REMOVED***.get)
     *
     * @param string $userKey Represents the profile id or the user email for which the data should be filtered.
     * @param string $date Represents the date in yyyy-mm-dd format for which the data is to be fetched.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string filters Represents the set of filters including parameter operator value.
     * @opt_param string maxResults Maximum number of results to return. Maximum allowed is 1000
     * @opt_param string pageToken Token to specify next page.
     * @opt_param string parameters Represents the application name, parameter name pairs to fetch in csv as app_name1:param_name1, app_name2:param_name2.
     * @return Google_UsageReports
     */
    public function get($userKey, $date, $optParams = array()) {
      $params = array('userKey' => $userKey, 'date' => $date);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_UsageReports($data);
      } else {
        return $data;
      }
    }
  }

/**
 * Service definition for Google_Reports (reports_v1).
 *
 * <p>
 * Allows the ***REMOVED*** of Google Apps customers to fetch reports about the usage, collaboration, security and risk for their users.
 * </p>
 *
 * <p>
 * For more information about this service, see the
 * <a href="https://developers.google.com/admin-sdk/reports/" target="_blank">API Documentation</a>
 * </p>
 *
 * @author Google, Inc.
 */
class Google_ReportsService extends Google_Service {
  public $activities;
  public $***REMOVED***;
  public $***REMOVED***;
  /**
   * Constructs the internal ***REMOVED*** of the Reports service.
   *
   * @param Google_Client $client
   */
  public function __construct(Google_Client $client) {
    $this->servicePath = 'admin/reports/v1/';
    $this->version = 'reports_v1';
    $this->serviceName = 'admin';

    $client->addService($this->serviceName, $this->version);
    $this->activities = new Google_ActivitiesServiceResource($this, $this->serviceName, 'activities', json_decode('{"methods": {"list": {"id": "reports.activities.list", "path": "activity/users/{userKey}/applications/{***REMOVED***}", "httpMethod": "GET", "parameters": {"***REMOVED***": {"type": "string", "location": "query"}, "***REMOVED***": {"type": "string", "required": true, "location": "path"}, "endTime": {"type": "string", "location": "query"}, "eventName": {"type": "string", "location": "query"}, "filters": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "int32", "minimum": "1", "maximum": "1000", "location": "query"}, "pageToken": {"type": "string", "location": "query"}, "startTime": {"type": "string", "location": "query"}, "userKey": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Activities"}, "scopes": ["https://www.googleapis.com/auth/admin.reports.audit.readonly"]}}}', true));
    $this->***REMOVED*** = new Google_CustomerUsageReportsServiceResource($this, $this->serviceName, '***REMOVED***', json_decode('{"methods": {"get": {"id": "reports.***REMOVED***.get", "path": "usage/dates/{date}", "httpMethod": "GET", "parameters": {"date": {"type": "string", "required": true, "location": "path"}, "pageToken": {"type": "string", "location": "query"}, "parameters": {"type": "string", "location": "query"}}, "response": {"$ref": "UsageReports"}, "scopes": ["https://www.googleapis.com/auth/admin.reports.usage.readonly"]}}}', true));
    $this->***REMOVED*** = new Google_UserUsageReportServiceResource($this, $this->serviceName, '***REMOVED***', json_decode('{"methods": {"get": {"id": "reports.***REMOVED***.get", "path": "usage/users/{userKey}/dates/{date}", "httpMethod": "GET", "parameters": {"date": {"type": "string", "required": true, "location": "path"}, "filters": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "maximum": "1000", "location": "query"}, "pageToken": {"type": "string", "location": "query"}, "parameters": {"type": "string", "location": "query"}, "userKey": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "UsageReports"}, "scopes": ["https://www.googleapis.com/auth/admin.reports.usage.readonly"]}}}', true));

  }
}



class Google_Activities extends Google_Model {
  protected $__itemsType = 'Google_Activity';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public $nextPageToken;
  public function setItems(/* array(Google_Activity) */ $items) {
    $this->assertIsArray($items, 'Google_Activity', __METHOD__);
    $this->items = $items;
  }
  public function getItems() {
    return $this->items;
  }
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
}

class Google_Activity extends Google_Model {
  protected $__actorType = 'Google_ActivityActor';
  protected $__actorDataType = '';
  public $actor;
  protected $__eventsType = 'Google_ActivityEvents';
  protected $__eventsDataType = 'array';
  public $events;
  protected $__idType = 'Google_ActivityId';
  protected $__idDataType = '';
  public $id;
  public $ipAddress;
  public $kind;
  public $ownerDomain;
  public function setActor(Google_ActivityActor $actor) {
    $this->actor = $actor;
  }
  public function getActor() {
    return $this->actor;
  }
  public function setEvents(/* array(Google_ActivityEvents) */ $events) {
    $this->assertIsArray($events, 'Google_ActivityEvents', __METHOD__);
    $this->events = $events;
  }
  public function getEvents() {
    return $this->events;
  }
  public function setId(Google_ActivityId $id) {
    $this->id = $id;
  }
  public function getId() {
    return $this->id;
  }
  public function setIpAddress( $ipAddress) {
    $this->ipAddress = $ipAddress;
  }
  public function getIpAddress() {
    return $this->ipAddress;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function ***REMOVED***( $ownerDomain) {
    $this->ownerDomain = $ownerDomain;
  }
  public function ***REMOVED***() {
    return $this->ownerDomain;
  }
}

class Google_ActivityActor extends Google_Model {
  public $callerType;
  public $email;
  public $key;
  public $profileId;
  public function setCallerType( $callerType) {
    $this->callerType = $callerType;
  }
  public function getCallerType() {
    return $this->callerType;
  }
  public function setEmail( $email) {
    $this->email = $email;
  }
  public function getEmail() {
    return $this->email;
  }
  public function setKey( $key) {
    $this->key = $key;
  }
  public function getKey() {
    return $this->key;
  }
  public function setProfileId( $profileId) {
    $this->profileId = $profileId;
  }
  public function getProfileId() {
    return $this->profileId;
  }
}

class Google_ActivityEvents extends Google_Model {
  public $name;
  protected $__parametersType = 'Google_ActivityEventsParameters';
  protected $__parametersDataType = 'array';
  public $parameters;
  public $type;
  public function setName( $name) {
    $this->name = $name;
  }
  public function getName() {
    return $this->name;
  }
  public function setParameters(/* array(Google_ActivityEventsParameters) */ $parameters) {
    $this->assertIsArray($parameters, 'Google_ActivityEventsParameters', __METHOD__);
    $this->parameters = $parameters;
  }
  public function getParameters() {
    return $this->parameters;
  }
  public function setType( $type) {
    $this->type = $type;
  }
  public function getType() {
    return $this->type;
  }
}

class Google_ActivityEventsParameters extends Google_Model {
  public $boolValue;
  public $intValue;
  public $name;
  public $value;
  public function setBoolValue( $boolValue) {
    $this->boolValue = $boolValue;
  }
  public function getBoolValue() {
    return $this->boolValue;
  }
  public function setIntValue( $intValue) {
    $this->intValue = $intValue;
  }
  public function getIntValue() {
    return $this->intValue;
  }
  public function setName( $name) {
    $this->name = $name;
  }
  public function getName() {
    return $this->name;
  }
  public function setValue( $value) {
    $this->value = $value;
  }
  public function getValue() {
    return $this->value;
  }
}

class Google_ActivityId extends Google_Model {
  public $***REMOVED***;
  public $customerId;
  public $time;
  public $***REMOVED***;
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
  public function setTime( $time) {
    $this->time = $time;
  }
  public function getTime() {
    return $this->time;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
}

class Google_UsageReport extends Google_Model {
  public $date;
  protected $__entityType = 'Google_UsageReportEntity';
  protected $__entityDataType = '';
  public $entity;
  public $kind;
  protected $__parametersType = 'Google_UsageReportParameters';
  protected $__parametersDataType = 'array';
  public $parameters;
  public function setDate( $date) {
    $this->date = $date;
  }
  public function getDate() {
    return $this->date;
  }
  public function setEntity(Google_UsageReportEntity $entity) {
    $this->entity = $entity;
  }
  public function getEntity() {
    return $this->entity;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setParameters(/* array(Google_UsageReportParameters) */ $parameters) {
    $this->assertIsArray($parameters, 'Google_UsageReportParameters', __METHOD__);
    $this->parameters = $parameters;
  }
  public function getParameters() {
    return $this->parameters;
  }
}

class Google_UsageReportEntity extends Google_Model {
  public $customerId;
  public $profileId;
  public $type;
  public $userEmail;
  public function setCustomerId( $customerId) {
    $this->customerId = $customerId;
  }
  public function getCustomerId() {
    return $this->customerId;
  }
  public function setProfileId( $profileId) {
    $this->profileId = $profileId;
  }
  public function getProfileId() {
    return $this->profileId;
  }
  public function setType( $type) {
    $this->type = $type;
  }
  public function getType() {
    return $this->type;
  }
  public function setUserEmail( $userEmail) {
    $this->userEmail = $userEmail;
  }
  public function getUserEmail() {
    return $this->userEmail;
  }
}

class Google_UsageReportParameters extends Google_Model {
  public $boolValue;
  public $datetimeValue;
  public $intValue;
  public $name;
  public $stringValue;
  public function setBoolValue( $boolValue) {
    $this->boolValue = $boolValue;
  }
  public function getBoolValue() {
    return $this->boolValue;
  }
  public function ***REMOVED***( $datetimeValue) {
    $this->datetimeValue = $datetimeValue;
  }
  public function ***REMOVED***() {
    return $this->datetimeValue;
  }
  public function setIntValue( $intValue) {
    $this->intValue = $intValue;
  }
  public function getIntValue() {
    return $this->intValue;
  }
  public function setName( $name) {
    $this->name = $name;
  }
  public function getName() {
    return $this->name;
  }
  public function ***REMOVED***( $stringValue) {
    $this->stringValue = $stringValue;
  }
  public function ***REMOVED***() {
    return $this->stringValue;
  }
}

class Google_UsageReports extends Google_Model {
  public $kind;
  public $nextPageToken;
  protected $__usageReportsType = 'Google_UsageReport';
  protected $__usageReportsDataType = 'array';
  public $usageReports;
  protected $__warningsType = 'Google_UsageReportsWarnings';
  protected $__warningsDataType = 'array';
  public $warnings;
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
  public function ***REMOVED***(/* array(Google_UsageReport) */ $usageReports) {
    $this->assertIsArray($usageReports, 'Google_UsageReport', __METHOD__);
    $this->usageReports = $usageReports;
  }
  public function ***REMOVED***() {
    return $this->usageReports;
  }
  public function setWarnings(/* array(Google_UsageReportsWarnings) */ $warnings) {
    $this->assertIsArray($warnings, 'Google_UsageReportsWarnings', __METHOD__);
    $this->warnings = $warnings;
  }
  public function getWarnings() {
    return $this->warnings;
  }
}

class Google_UsageReportsWarnings extends Google_Model {
  public $code;
  protected $__dataType = 'Google_UsageReportsWarningsData';
  protected $__dataDataType = 'array';
  public $data;
  public $message;
  public function setCode( $code) {
    $this->code = $code;
  }
  public function getCode() {
    return $this->code;
  }
  public function setData(/* array(Google_UsageReportsWarningsData) */ $data) {
    $this->assertIsArray($data, 'Google_UsageReportsWarningsData', __METHOD__);
    $this->data = $data;
  }
  public function getData() {
    return $this->data;
  }
  public function setMessage( $message) {
    $this->message = $message;
  }
  public function getMessage() {
    return $this->message;
  }
}

class Google_UsageReportsWarningsData extends Google_Model {
  public $key;
  public $value;
  public function setKey( $key) {
    $this->key = $key;
  }
  public function getKey() {
    return $this->key;
  }
  public function setValue( $value) {
    $this->value = $value;
  }
  public function getValue() {
    return $this->value;
  }
}
