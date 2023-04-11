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
   * The "groups" collection of methods.
   * Typical usage is:
   *  <code>
   *   $groupssettingsService = new Google_GroupssettingsService(...);
   *   $groups = $groupssettingsService->groups;
   *  </code>
   */
  class Google_GroupsServiceResource extends Google_ServiceResource {

    /**
     * Gets one resource by id. (groups.get)
     *
     * @param string $groupUniqueId The resource ID
     * @param array $optParams Optional parameters.
     * @return Google_Groups
     */
    public function get($groupUniqueId, $optParams = array()) {
      $params = array('groupUniqueId' => $groupUniqueId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Groups($data);
      } else {
        return $data;
      }
    }
    /**
     * Updates an existing resource. This method supports patch semantics. (groups.patch)
     *
     * @param string $groupUniqueId The resource ID
     * @param Google_Groups $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Groups
     */
    public function patch($groupUniqueId, Google_Groups $postBody, $optParams = array()) {
      $params = array('groupUniqueId' => $groupUniqueId, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('patch', array($params));
      if ($this->useObjects()) {
        return new Google_Groups($data);
      } else {
        return $data;
      }
    }
    /**
     * Updates an existing resource. (groups.update)
     *
     * @param string $groupUniqueId The resource ID
     * @param Google_Groups $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Groups
     */
    public function update($groupUniqueId, Google_Groups $postBody, $optParams = array()) {
      $params = array('groupUniqueId' => $groupUniqueId, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('update', array($params));
      if ($this->useObjects()) {
        return new Google_Groups($data);
      } else {
        return $data;
      }
    }
  }

/**
 * Service definition for Google_Groupssettings (v1).
 *
 * <p>
 * Lets you manage permission levels and related settings of a group.
 * </p>
 *
 * <p>
 * For more information about this service, see the
 * <a href="https://developers.google.com/google-apps/groups-settings/get_started" target="_blank">API Documentation</a>
 * </p>
 *
 * @author Google, Inc.
 */
class Google_GroupssettingsService extends Google_Service {
  public $groups;
  /**
   * Constructs the internal ***REMOVED*** of the ***REMOVED*** service.
   *
   * @param Google_Client $client
   */
  public function __construct(Google_Client $client) {
    $this->servicePath = 'groups/v1/groups/';
    $this->version = 'v1';
    $this->serviceName = '***REMOVED***';

    $client->addService($this->serviceName, $this->version);
    $this->groups = new Google_GroupsServiceResource($this, $this->serviceName, 'groups', json_decode('{"methods": {"get": {"id": "***REMOVED***.groups.get", "path": "{groupUniqueId}", "httpMethod": "GET", "parameters": {"groupUniqueId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Groups"}, "scopes": ["https://www.googleapis.com/auth/apps.groups.settings"]}, "patch": {"id": "***REMOVED***.groups.patch", "path": "{groupUniqueId}", "httpMethod": "PATCH", "parameters": {"groupUniqueId": {"type": "string", "required": true, "location": "path"}}, "request": {"$ref": "Groups"}, "response": {"$ref": "Groups"}, "scopes": ["https://www.googleapis.com/auth/apps.groups.settings"]}, "update": {"id": "***REMOVED***.groups.update", "path": "{groupUniqueId}", "httpMethod": "PUT", "parameters": {"groupUniqueId": {"type": "string", "required": true, "location": "path"}}, "request": {"$ref": "Groups"}, "response": {"$ref": "Groups"}, "scopes": ["https://www.googleapis.com/auth/apps.groups.settings"]}}}', true));

  }
}



class Google_Groups extends Google_Model {
  public $***REMOVED***;
  public $allowGoogleCommunication;
  public $***REMOVED***;
  public $archiveOnly;
  public $customReplyTo;
  public $defaultMessageDenyNotificationText;
  public $description;
  public $email;
  public $includeInGlobalAddressList;
  public $isArchived;
  public $kind;
  public $***REMOVED***;
  public $membersCanPostAsTheGroup;
  public $***REMOVED***;
  public $messageModerationLevel;
  public $name;
  public $***REMOVED***;
  public $replyTo;
  public $sendMessageDenyNotification;
  public $***REMOVED***;
  public $***REMOVED***;
  public $whoCanInvite;
  public $whoCanJoin;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public function setAllowExternalMembers( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getAllowExternalMembers() {
    return $this->***REMOVED***;
  }
  public function setAllowGoogleCommunication( $allowGoogleCommunication) {
    $this->allowGoogleCommunication = $allowGoogleCommunication;
  }
  public function getAllowGoogleCommunication() {
    return $this->allowGoogleCommunication;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $archiveOnly) {
    $this->archiveOnly = $archiveOnly;
  }
  public function ***REMOVED***() {
    return $this->archiveOnly;
  }
  public function ***REMOVED***( $customReplyTo) {
    $this->customReplyTo = $customReplyTo;
  }
  public function ***REMOVED***() {
    return $this->customReplyTo;
  }
  public function setDefaultMessageDenyNotificationText( $defaultMessageDenyNotificationText) {
    $this->defaultMessageDenyNotificationText = $defaultMessageDenyNotificationText;
  }
  public function getDefaultMessageDenyNotificationText() {
    return $this->defaultMessageDenyNotificationText;
  }
  public function ***REMOVED***( $description) {
    $this->description = $description;
  }
  public function ***REMOVED***() {
    return $this->description;
  }
  public function setEmail( $email) {
    $this->email = $email;
  }
  public function getEmail() {
    return $this->email;
  }
  public function setIncludeInGlobalAddressList( $includeInGlobalAddressList) {
    $this->includeInGlobalAddressList = $includeInGlobalAddressList;
  }
  public function getIncludeInGlobalAddressList() {
    return $this->includeInGlobalAddressList;
  }
  public function setIsArchived( $isArchived) {
    $this->isArchived = $isArchived;
  }
  public function getIsArchived() {
    return $this->isArchived;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setMembersCanPostAsTheGroup( $membersCanPostAsTheGroup) {
    $this->membersCanPostAsTheGroup = $membersCanPostAsTheGroup;
  }
  public function getMembersCanPostAsTheGroup() {
    return $this->membersCanPostAsTheGroup;
  }
  public function setMessageDisplayFont( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getMessageDisplayFont() {
    return $this->***REMOVED***;
  }
  public function setMessageModerationLevel( $messageModerationLevel) {
    $this->messageModerationLevel = $messageModerationLevel;
  }
  public function getMessageModerationLevel() {
    return $this->messageModerationLevel;
  }
  public function setName( $name) {
    $this->name = $name;
  }
  public function getName() {
    return $this->name;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setReplyTo( $replyTo) {
    $this->replyTo = $replyTo;
  }
  public function getReplyTo() {
    return $this->replyTo;
  }
  public function setSendMessageDenyNotification( $sendMessageDenyNotification) {
    $this->sendMessageDenyNotification = $sendMessageDenyNotification;
  }
  public function getSendMessageDenyNotification() {
    return $this->sendMessageDenyNotification;
  }
  public function setShowInGroupDirectory( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getShowInGroupDirectory() {
    return $this->***REMOVED***;
  }
  public function setSpamModerationLevel( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getSpamModerationLevel() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $whoCanInvite) {
    $this->whoCanInvite = $whoCanInvite;
  }
  public function ***REMOVED***() {
    return $this->whoCanInvite;
  }
  public function setWhoCanJoin( $whoCanJoin) {
    $this->whoCanJoin = $whoCanJoin;
  }
  public function getWhoCanJoin() {
    return $this->whoCanJoin;
  }
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
  public function setWhoCanViewMembership( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getWhoCanViewMembership() {
    return $this->***REMOVED***;
  }
}
