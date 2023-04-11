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
   * The "advertisers" collection of methods.
   * Typical usage is:
   *  <code>
   *   $ganService = new Google_GanService(...);
   *   $advertisers = $ganService->advertisers;
   *  </code>
   */
  class Google_AdvertisersServiceResource extends Google_ServiceResource {

    /**
     * Retrieves data about a single advertiser if that the requesting advertiser/publisher has access
     * to it. Only publishers can lookup advertisers. Advertisers can request information about
     * themselves by omitting the advertiserId query parameter. (advertisers.get)
     *
     * @param string $role The role of the requester. Valid values: 'advertisers' or 'publishers'.
     * @param string $roleId The ID of the requesting advertiser or publisher.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string advertiserId The ID of the advertiser to look up. Optional.
     * @return Google_Advertiser
     */
    public function get($role, $roleId, $optParams = array()) {
      $params = array('role' => $role, 'roleId' => $roleId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Advertiser($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves data about all advertisers that the requesting advertiser/publisher has access to.
     * (advertisers.list)
     *
     * @param string $role The role of the requester. Valid values: 'advertisers' or 'publishers'.
     * @param string $roleId The ID of the requesting advertiser or publisher.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string ***REMOVED*** Caret(^) delimted list of advertiser categories. Valid categories are defined here: http://www.google.com/support/***REMOVED***/advertiser/bin/answer.py?hl=en=107581. Filters out all advertisers not in one of the given advertiser categories. Optional.
     * @opt_param string maxResults Max number of items to return in this page. Optional. Defaults to 20.
     * @opt_param double ***REMOVED*** Filters out all advertisers that have a ninety day EPC average lower than the given value (inclusive). Min value: 0.0. Optional.
     * @opt_param int minPayoutRank A value between 1 and 4, where 1 represents the quartile of advertisers with the lowest ranks and 4 represents the quartile of advertisers with the highest ranks. Filters out all advertisers with a lower rank than the given quartile. For example if a 2 was given only advertisers with a payout rank of 25 or higher would be included. Optional.
     * @opt_param double ***REMOVED*** Filters out all advertisers that have a seven day EPC average lower than the given value (inclusive). Min value: 0.0. Optional.
     * @opt_param string pageToken The value of 'nextPageToken' from the previous page. Optional.
     * @opt_param string ***REMOVED*** Filters out all advertisers for which do not have the given relationship status with the requesting publisher.
     * @return Google_Advertisers
     */
    public function ***REMOVED***($role, $roleId, $optParams = array()) {
      $params = array('role' => $role, 'roleId' => $roleId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Advertisers($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "ccOffers" collection of methods.
   * Typical usage is:
   *  <code>
   *   $ganService = new Google_GanService(...);
   *   $ccOffers = $ganService->ccOffers;
   *  </code>
   */
  class Google_CcOffersServiceResource extends Google_ServiceResource {

    /**
     * Retrieves credit card offers for the given publisher. (ccOffers.list)
     *
     * @param string $publisher The ID of the publisher in question.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string advertiser The advertiser ID of a card issuer whose offers to include. Optional, may be repeated.
     * @opt_param string projection The set of fields to return.
     * @return Google_CcOffers
     */
    public function listCcOffers($publisher, $optParams = array()) {
      $params = array('publisher' => $publisher);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_CcOffers($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "events" collection of methods.
   * Typical usage is:
   *  <code>
   *   $ganService = new Google_GanService(...);
   *   $events = $ganService->events;
   *  </code>
   */
  class Google_EventsServiceResource extends Google_ServiceResource {

    /**
     * Retrieves event data for a given advertiser/publisher. (events.list)
     *
     * @param string $role The role of the requester. Valid values: 'advertisers' or 'publishers'.
     * @param string $roleId The ID of the requesting advertiser or publisher.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string advertiserId Caret(^) delimited list of advertiser IDs. Filters out all events that do not reference one of the given advertiser IDs. Only used when under publishers role. Optional.
     * @opt_param string chargeType Filters out all charge events that are not of the given charge type. Valid values: 'other', 'slotting_fee', 'monthly_minimum', 'tier_bonus', 'credit', 'debit'. Optional.
     * @opt_param string eventDateMax Filters out all events later than given date. Optional. Defaults to 24 hours after eventMin.
     * @opt_param string eventDateMin Filters out all events earlier than given date. Optional. Defaults to 24 hours from current date/time.
     * @opt_param string linkId Caret(^) delimited list of link IDs. Filters out all events that do not reference one of the given link IDs. Optional.
     * @opt_param string maxResults Max number of offers to return in this page. Optional. Defaults to 20.
     * @opt_param string memberId Caret(^) delimited list of member IDs. Filters out all events that do not reference one of the given member IDs. Optional.
     * @opt_param string modifyDateMax Filters out all events modified later than given date. Optional. Defaults to 24 hours after modifyDateMin, if modifyDateMin is explicitly set.
     * @opt_param string modifyDateMin Filters out all events modified earlier than given date. Optional. Defaults to 24 hours before the current modifyDateMax, if modifyDateMax is explicitly set.
     * @opt_param string orderId Caret(^) delimited list of order IDs. Filters out all events that do not reference one of the given order IDs. Optional.
     * @opt_param string pageToken The value of 'nextPageToken' from the previous page. Optional.
     * @opt_param string ***REMOVED*** Caret(^) delimited list of product categories. Filters out all events that do not reference a product in one of the given product categories. Optional.
     * @opt_param string publisherId Caret(^) delimited list of publisher IDs. Filters out all events that do not reference one of the given publishers IDs. Only used when under advertiser role. Optional.
     * @opt_param string sku Caret(^) delimited list of SKUs. Filters out all events that do not reference one of the given SKU. Optional.
     * @opt_param string status Filters out all events that do not have the given status. Valid values: 'active', 'canceled'. Optional.
     * @opt_param string type Filters out all events that are not of the given type. Valid values: 'action', 'transaction', 'charge'. Optional.
     * @return Google_Events
     */
    public function listEvents($role, $roleId, $optParams = array()) {
      $params = array('role' => $role, 'roleId' => $roleId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Events($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "links" collection of methods.
   * Typical usage is:
   *  <code>
   *   $ganService = new Google_GanService(...);
   *   $links = $ganService->links;
   *  </code>
   */
  class Google_LinksServiceResource extends Google_ServiceResource {

    /**
     * Retrieves data about a single link if the requesting advertiser/publisher has access to it.
     * Advertisers can look up their own links. Publishers can look up visible links or links belonging
     * to advertisers they are in a relationship with. (links.get)
     *
     * @param string $role The role of the requester. Valid values: 'advertisers' or 'publishers'.
     * @param string $roleId The ID of the requesting advertiser or publisher.
     * @param string $linkId The ID of the link to look up.
     * @param array $optParams Optional parameters.
     * @return Google_Link
     */
    public function get($role, $roleId, $linkId, $optParams = array()) {
      $params = array('role' => $role, 'roleId' => $roleId, 'linkId' => $linkId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Link($data);
      } else {
        return $data;
      }
    }
    /**
     * Inserts a new link. (links.insert)
     *
     * @param string $role The role of the requester. Valid values: 'advertisers' or 'publishers'.
     * @param string $roleId The ID of the requesting advertiser or publisher.
     * @param Google_Link $postBody
     * @param array $optParams Optional parameters.
     * @return Google_Link
     */
    public function insert($role, $roleId, Google_Link $postBody, $optParams = array()) {
      $params = array('role' => $role, 'roleId' => $roleId, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('insert', array($params));
      if ($this->useObjects()) {
        return new Google_Link($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves all links that match the query parameters. (links.list)
     *
     * @param string $role The role of the requester. Valid values: 'advertisers' or 'publishers'.
     * @param string $roleId The ID of the requesting advertiser or publisher.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string advertiserId Limits the resulting links to the ones belonging to the listed advertisers.
     * @opt_param string assetSize The size of the given asset.
     * @opt_param string authorship The role of the author of the link.
     * @opt_param string createDateMax The end of the create date range.
     * @opt_param string createDateMin The beginning of the create date range.
     * @opt_param string linkType The type of the link.
     * @opt_param string maxResults Max number of items to return in this page. Optional. Defaults to 20.
     * @opt_param string pageToken The value of 'nextPageToken' from the previous page. Optional.
     * @opt_param string promotionType The promotion type.
     * @opt_param string ***REMOVED*** The status of the relationship.
     * @opt_param string searchText Field for full text search across title and merchandising text, supports link id search.
     * @opt_param string startDateMax The end of the start date range.
     * @opt_param string startDateMin The beginning of the start date range.
     * @return Google_Links
     */
    public function listLinks($role, $roleId, $optParams = array()) {
      $params = array('role' => $role, 'roleId' => $roleId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Links($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "publishers" collection of methods.
   * Typical usage is:
   *  <code>
   *   $ganService = new Google_GanService(...);
   *   $publishers = $ganService->publishers;
   *  </code>
   */
  class Google_PublishersServiceResource extends Google_ServiceResource {

    /**
     * Retrieves data about a single advertiser if that the requesting advertiser/publisher has access
     * to it. Only advertisers can look up publishers. Publishers can request information about
     * themselves by omitting the publisherId query parameter. (publishers.get)
     *
     * @param string $role The role of the requester. Valid values: 'advertisers' or 'publishers'.
     * @param string $roleId The ID of the requesting advertiser or publisher.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string publisherId The ID of the publisher to look up. Optional.
     * @return Google_Publisher
     */
    public function get($role, $roleId, $optParams = array()) {
      $params = array('role' => $role, 'roleId' => $roleId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Publisher($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves data about all publishers that the requesting advertiser/publisher has access to.
     * (publishers.list)
     *
     * @param string $role The role of the requester. Valid values: 'advertisers' or 'publishers'.
     * @param string $roleId The ID of the requesting advertiser or publisher.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string maxResults Max number of items to return in this page. Optional. Defaults to 20.
     * @opt_param double ***REMOVED*** Filters out all publishers that have a ninety day EPC average lower than the given value (inclusive). Min value: 0.0. Optional.
     * @opt_param int minPayoutRank A value between 1 and 4, where 1 represents the quartile of publishers with the lowest ranks and 4 represents the quartile of publishers with the highest ranks. Filters out all publishers with a lower rank than the given quartile. For example if a 2 was given only publishers with a payout rank of 25 or higher would be included. Optional.
     * @opt_param double ***REMOVED*** Filters out all publishers that have a seven day EPC average lower than the given value (inclusive). Min value 0.0. Optional.
     * @opt_param string pageToken The value of 'nextPageToken' from the previous page. Optional.
     * @opt_param string ***REMOVED*** Caret(^) delimted list of publisher categories. Valid categories: (unclassified|community_and_content|shopping_and_promotion|loyalty_and_rewards|network|search_specialist|comparison_shopping|email). Filters out all publishers not in one of the given advertiser categories. Optional.
     * @opt_param string ***REMOVED*** Filters out all publishers for which do not have the given relationship status with the requesting publisher.
     * @return Google_Publishers
     */
    public function ***REMOVED***($role, $roleId, $optParams = array()) {
      $params = array('role' => $role, 'roleId' => $roleId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Publishers($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "reports" collection of methods.
   * Typical usage is:
   *  <code>
   *   $ganService = new Google_GanService(...);
   *   $reports = $ganService->reports;
   *  </code>
   */
  class Google_ReportsServiceResource extends Google_ServiceResource {

    /**
     * Retrieves a report of the specified type. (reports.get)
     *
     * @param string $role The role of the requester. Valid values: 'advertisers' or 'publishers'.
     * @param string $roleId The ID of the requesting advertiser or publisher.
     * @param string $reportType The type of report being requested. Valid values: 'order_delta'. Required.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string advertiserId The IDs of the advertisers to look up, if applicable.
     * @opt_param bool ***REMOVED*** Whether or not to calculate totals rows. Optional.
     * @opt_param string endDate The end date (exclusive), in RFC 3339 format, for the report data to be returned. Defaults to one day after startDate, if that is given, or today. Optional.
     * @opt_param string eventType Filters out all events that are not of the given type. Valid values: 'action', 'transaction', or 'charge'. Optional.
     * @opt_param string linkId Filters to capture one of given link IDs. Optional.
     * @opt_param string maxResults Max number of items to return in this page. Optional. Defaults to return all results.
     * @opt_param string orderId Filters to capture one of the given order IDs. Optional.
     * @opt_param string publisherId The IDs of the publishers to look up, if applicable.
     * @opt_param string startDate The start date (inclusive), in RFC 3339 format, for the report data to be returned. Defaults to one day before endDate, if that is given, or yesterday. Optional.
     * @opt_param string startIndex Offset on which to return results when paging. Optional.
     * @opt_param string status Filters out all events that do not have the given status. Valid values: 'active', 'canceled', or 'invalid'. Optional.
     * @return Google_Report
     */
    public function get($role, $roleId, $reportType, $optParams = array()) {
      $params = array('role' => $role, 'roleId' => $roleId, 'reportType' => $reportType);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Report($data);
      } else {
        return $data;
      }
    }
  }

/**
 * Service definition for Google_Gan (v1beta1).
 *
 * <p>
 * Lets you have programmatic access to your Google Affiliate Network data.
 * </p>
 *
 * <p>
 * For more information about this service, see the
 * <a href="https://developers.google.com/affiliate-network/" target="_blank">API Documentation</a>
 * </p>
 *
 * @author Google, Inc.
 */
class Google_GanService extends Google_Service {
  public $advertisers;
  public $ccOffers;
  public $events;
  public $links;
  public $publishers;
  public $reports;
  /**
   * Constructs the internal ***REMOVED*** of the Gan service.
   *
   * @param Google_Client $client
   */
  public function __construct(Google_Client $client) {
    $this->servicePath = 'gan/v1beta1/';
    $this->version = 'v1beta1';
    $this->serviceName = 'gan';

    $client->addService($this->serviceName, $this->version);
    $this->advertisers = new Google_AdvertisersServiceResource($this, $this->serviceName, 'advertisers', json_decode('{"methods": {"get": {"id": "gan.advertisers.get", "path": "{role}/{roleId}/advertiser", "httpMethod": "GET", "parameters": {"advertiserId": {"type": "string", "location": "query"}, "role": {"type": "string", "required": true, "enum": ["advertisers", "publishers"], "location": "path"}, "roleId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Advertiser"}, "scopes": ["https://www.googleapis.com/auth/gan", "https://www.googleapis.com/auth/gan.readonly"]}, "list": {"id": "gan.advertisers.list", "path": "{role}/{roleId}/advertisers", "httpMethod": "GET", "parameters": {"***REMOVED***": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "maximum": "100", "location": "query"}, "***REMOVED***": {"type": "number", "format": "double", "location": "query"}, "minPayoutRank": {"type": "integer", "format": "int32", "minimum": "1", "maximum": "4", "location": "query"}, "***REMOVED***": {"type": "number", "format": "double", "location": "query"}, "pageToken": {"type": "string", "location": "query"}, "***REMOVED***": {"type": "string", "enum": ["approved", "available", "deactivated", "declined", "pending"], "location": "query"}, "role": {"type": "string", "required": true, "enum": ["advertisers", "publishers"], "location": "path"}, "roleId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Advertisers"}, "scopes": ["https://www.googleapis.com/auth/gan", "https://www.googleapis.com/auth/gan.readonly"]}}}', true));
    $this->ccOffers = new Google_CcOffersServiceResource($this, $this->serviceName, 'ccOffers', json_decode('{"methods": {"list": {"id": "gan.ccOffers.list", "path": "publishers/{publisher}/ccOffers", "httpMethod": "GET", "parameters": {"advertiser": {"type": "string", "repeated": true, "location": "query"}, "projection": {"type": "string", "enum": ["full", "summary"], "location": "query"}, "publisher": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "CcOffers"}, "scopes": ["https://www.googleapis.com/auth/gan", "https://www.googleapis.com/auth/gan.readonly"]}}}', true));
    $this->events = new Google_EventsServiceResource($this, $this->serviceName, 'events', json_decode('{"methods": {"list": {"id": "gan.events.list", "path": "{role}/{roleId}/events", "httpMethod": "GET", "parameters": {"advertiserId": {"type": "string", "location": "query"}, "chargeType": {"type": "string", "enum": ["credit", "debit", "monthly_minimum", "other", "slotting_fee", "tier_bonus"], "location": "query"}, "eventDateMax": {"type": "string", "location": "query"}, "eventDateMin": {"type": "string", "location": "query"}, "linkId": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "maximum": "100", "location": "query"}, "memberId": {"type": "string", "location": "query"}, "modifyDateMax": {"type": "string", "location": "query"}, "modifyDateMin": {"type": "string", "location": "query"}, "orderId": {"type": "string", "location": "query"}, "pageToken": {"type": "string", "location": "query"}, "***REMOVED***": {"type": "string", "location": "query"}, "publisherId": {"type": "string", "location": "query"}, "role": {"type": "string", "required": true, "enum": ["advertisers", "publishers"], "location": "path"}, "roleId": {"type": "string", "required": true, "location": "path"}, "sku": {"type": "string", "location": "query"}, "status": {"type": "string", "enum": ["active", "canceled"], "location": "query"}, "type": {"type": "string", "enum": ["action", "charge", "transaction"], "location": "query"}}, "response": {"$ref": "Events"}, "scopes": ["https://www.googleapis.com/auth/gan", "https://www.googleapis.com/auth/gan.readonly"]}}}', true));
    $this->links = new Google_LinksServiceResource($this, $this->serviceName, 'links', json_decode('{"methods": {"get": {"id": "gan.links.get", "path": "{role}/{roleId}/link/{linkId}", "httpMethod": "GET", "parameters": {"linkId": {"type": "string", "required": true, "format": "int64", "location": "path"}, "role": {"type": "string", "required": true, "enum": ["advertisers", "publishers"], "location": "path"}, "roleId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Link"}, "scopes": ["https://www.googleapis.com/auth/gan", "https://www.googleapis.com/auth/gan.readonly"]}, "insert": {"id": "gan.links.insert", "path": "{role}/{roleId}/link", "httpMethod": "POST", "parameters": {"role": {"type": "string", "required": true, "enum": ["advertisers", "publishers"], "location": "path"}, "roleId": {"type": "string", "required": true, "location": "path"}}, "request": {"$ref": "Link"}, "response": {"$ref": "Link"}, "scopes": ["https://www.googleapis.com/auth/gan"]}, "list": {"id": "gan.links.list", "path": "{role}/{roleId}/links", "httpMethod": "GET", "parameters": {"advertiserId": {"type": "string", "format": "int64", "repeated": true, "location": "query"}, "assetSize": {"type": "string", "repeated": true, "location": "query"}, "authorship": {"type": "string", "enum": ["advertiser", "publisher"], "location": "query"}, "createDateMax": {"type": "string", "location": "query"}, "createDateMin": {"type": "string", "location": "query"}, "linkType": {"type": "string", "enum": ["banner", "text"], "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "maximum": "100", "location": "query"}, "pageToken": {"type": "string", "location": "query"}, "promotionType": {"type": "string", "enum": ["coupon", "free_gift", "free_shipping", "percent_off", "price_cut"], "repeated": true, "location": "query"}, "***REMOVED***": {"type": "string", "enum": ["approved", "available"], "location": "query"}, "role": {"type": "string", "required": true, "enum": ["advertisers", "publishers"], "location": "path"}, "roleId": {"type": "string", "required": true, "location": "path"}, "searchText": {"type": "string", "location": "query"}, "startDateMax": {"type": "string", "location": "query"}, "startDateMin": {"type": "string", "location": "query"}}, "response": {"$ref": "Links"}, "scopes": ["https://www.googleapis.com/auth/gan", "https://www.googleapis.com/auth/gan.readonly"]}}}', true));
    $this->publishers = new Google_PublishersServiceResource($this, $this->serviceName, 'publishers', json_decode('{"methods": {"get": {"id": "gan.publishers.get", "path": "{role}/{roleId}/publisher", "httpMethod": "GET", "parameters": {"publisherId": {"type": "string", "location": "query"}, "role": {"type": "string", "required": true, "enum": ["advertisers", "publishers"], "location": "path"}, "roleId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Publisher"}, "scopes": ["https://www.googleapis.com/auth/gan", "https://www.googleapis.com/auth/gan.readonly"]}, "list": {"id": "gan.publishers.list", "path": "{role}/{roleId}/publishers", "httpMethod": "GET", "parameters": {"maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "maximum": "100", "location": "query"}, "***REMOVED***": {"type": "number", "format": "double", "location": "query"}, "minPayoutRank": {"type": "integer", "format": "int32", "minimum": "1", "maximum": "4", "location": "query"}, "***REMOVED***": {"type": "number", "format": "double", "location": "query"}, "pageToken": {"type": "string", "location": "query"}, "***REMOVED***": {"type": "string", "location": "query"}, "***REMOVED***": {"type": "string", "enum": ["approved", "available", "deactivated", "declined", "pending"], "location": "query"}, "role": {"type": "string", "required": true, "enum": ["advertisers", "publishers"], "location": "path"}, "roleId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Publishers"}, "scopes": ["https://www.googleapis.com/auth/gan", "https://www.googleapis.com/auth/gan.readonly"]}}}', true));
    $this->reports = new Google_ReportsServiceResource($this, $this->serviceName, 'reports', json_decode('{"methods": {"get": {"id": "gan.reports.get", "path": "{role}/{roleId}/report/{reportType}", "httpMethod": "GET", "parameters": {"advertiserId": {"type": "string", "repeated": true, "location": "query"}, "***REMOVED***": {"type": "boolean", "location": "query"}, "endDate": {"type": "string", "location": "query"}, "eventType": {"type": "string", "enum": ["action", "charge", "transaction"], "location": "query"}, "linkId": {"type": "string", "repeated": true, "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "location": "query"}, "orderId": {"type": "string", "repeated": true, "location": "query"}, "publisherId": {"type": "string", "repeated": true, "location": "query"}, "reportType": {"type": "string", "required": true, "enum": ["order_delta"], "location": "path"}, "role": {"type": "string", "required": true, "enum": ["advertisers", "publishers"], "location": "path"}, "roleId": {"type": "string", "required": true, "location": "path"}, "startDate": {"type": "string", "location": "query"}, "startIndex": {"type": "integer", "format": "uint32", "minimum": "0", "location": "query"}, "status": {"type": "string", "enum": ["active", "canceled", "invalid"], "location": "query"}}, "response": {"$ref": "Report"}, "scopes": ["https://www.googleapis.com/auth/gan", "https://www.googleapis.com/auth/gan.readonly"]}}}', true));

  }
}



class Google_Advertiser extends Google_Model {
  public $allowPublisherCreatedLinks;
  public $category;
  public $***REMOVED***;
  public $contactEmail;
  public $contactPhone;
  public $defaultLinkId;
  public $description;
  protected $__epcNinetyDayAverageType = 'Google_Money';
  protected $__epcNinetyDayAverageDataType = '';
  public $***REMOVED***;
  protected $__epcSevenDayAverageType = 'Google_Money';
  protected $__epcSevenDayAverageDataType = '';
  public $***REMOVED***;
  public $id;
  protected $__itemType = 'Google_Advertiser';
  protected $__itemDataType = '';
  public $item;
  public $joinDate;
  public $kind;
  public $logoUrl;
  public $***REMOVED***;
  public $name;
  public $payoutRank;
  public $***REMOVED***;
  public $***REMOVED***;
  public $siteUrl;
  public $status;
  public function setAllowPublisherCreatedLinks( $allowPublisherCreatedLinks) {
    $this->allowPublisherCreatedLinks = $allowPublisherCreatedLinks;
  }
  public function getAllowPublisherCreatedLinks() {
    return $this->allowPublisherCreatedLinks;
  }
  public function setCategory( $category) {
    $this->category = $category;
  }
  public function getCategory() {
    return $this->category;
  }
  public function setCommissionDuration( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getCommissionDuration() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $contactEmail) {
    $this->contactEmail = $contactEmail;
  }
  public function ***REMOVED***() {
    return $this->contactEmail;
  }
  public function ***REMOVED***( $contactPhone) {
    $this->contactPhone = $contactPhone;
  }
  public function ***REMOVED***() {
    return $this->contactPhone;
  }
  public function ***REMOVED***( $defaultLinkId) {
    $this->defaultLinkId = $defaultLinkId;
  }
  public function ***REMOVED***() {
    return $this->defaultLinkId;
  }
  public function ***REMOVED***( $description) {
    $this->description = $description;
  }
  public function ***REMOVED***() {
    return $this->description;
  }
  public function setEpcNinetyDayAverage(Google_Money $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getEpcNinetyDayAverage() {
    return $this->***REMOVED***;
  }
  public function setEpcSevenDayAverage(Google_Money $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getEpcSevenDayAverage() {
    return $this->***REMOVED***;
  }
  public function setId( $id) {
    $this->id = $id;
  }
  public function getId() {
    return $this->id;
  }
  public function setItem(Google_Advertiser $item) {
    $this->item = $item;
  }
  public function getItem() {
    return $this->item;
  }
  public function setJoinDate( $joinDate) {
    $this->joinDate = $joinDate;
  }
  public function getJoinDate() {
    return $this->joinDate;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setLogoUrl( $logoUrl) {
    $this->logoUrl = $logoUrl;
  }
  public function getLogoUrl() {
    return $this->logoUrl;
  }
  public function ***REMOVED***(/* array(Google_string) */ $***REMOVED***) {
    $this->assertIsArray($***REMOVED***, 'Google_string', __METHOD__);
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setName( $name) {
    $this->name = $name;
  }
  public function getName() {
    return $this->name;
  }
  public function setPayoutRank( $payoutRank) {
    $this->payoutRank = $payoutRank;
  }
  public function getPayoutRank() {
    return $this->payoutRank;
  }
  public function setProductFeedsEnabled( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getProductFeedsEnabled() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(/* array(Google_string) */ $***REMOVED***) {
    $this->assertIsArray($***REMOVED***, 'Google_string', __METHOD__);
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setSiteUrl( $siteUrl) {
    $this->siteUrl = $siteUrl;
  }
  public function getSiteUrl() {
    return $this->siteUrl;
  }
  public function setStatus( $status) {
    $this->status = $status;
  }
  public function getStatus() {
    return $this->status;
  }
}

class Google_Advertisers extends Google_Model {
  protected $__itemsType = 'Google_Advertiser';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public $nextPageToken;
  public function setItems(/* array(Google_Advertiser) */ $items) {
    $this->assertIsArray($items, 'Google_Advertiser', __METHOD__);
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

class Google_CcOffer extends Google_Model {
  public $additionalCardBenefits;
  public $additionalCardHolderFee;
  public $ageMinimum;
  public $***REMOVED***;
  public $annualFee;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $aprDisplay;
  public $balanceComputationMethod;
  public $***REMOVED***;
  protected $__bonusRewardsType = 'Google_CcOfferBonusRewards';
  protected $__bonusRewardsDataType = 'array';
  public $bonusRewards;
  public $***REMOVED***;
  public $cardBenefits;
  public $cardName;
  public $cardType;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  protected $__defaultFeesType = 'Google_CcOfferDefaultFees';
  protected $__defaultFeesDataType = 'array';
  public $defaultFees;
  public $disclaimer;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $flightAccidentInsurance;
  public $foreignCurrencyTransactionFee;
  public $***REMOVED***;
  public $***REMOVED***;
  public $imageUrl;
  public $initialSetupAndProcessingFee;
  public $introBalanceTransferTerms;
  public $introCashAdvanceTerms;
  public $***REMOVED***;
  public $issuer;
  public $issuerId;
  public $issuerWebsite;
  public $kind;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $network;
  public $offerId;
  public $offersImmediateCashReward;
  public $overLimitFee;
  public $***REMOVED***;
  public $purchaseRateAdditionalDetails;
  public $***REMOVED***;
  public $***REMOVED***;
  public $rewardPartner;
  public $rewardUnit;
  protected $__rewardsType = 'Google_CcOfferRewards';
  protected $__rewardsDataType = 'array';
  public $rewards;
  public $rewardsExpire;
  public $rewardsHaveBlackoutDates;
  public $***REMOVED***;
  public $trackingUrl;
  public $***REMOVED***;
  public $variableRatesLastUpdated;
  public $variableRatesUpdateFrequency;
  public function setAdditionalCardBenefits(/* array(Google_string) */ $additionalCardBenefits) {
    $this->assertIsArray($additionalCardBenefits, 'Google_string', __METHOD__);
    $this->additionalCardBenefits = $additionalCardBenefits;
  }
  public function getAdditionalCardBenefits() {
    return $this->additionalCardBenefits;
  }
  public function setAdditionalCardHolderFee( $additionalCardHolderFee) {
    $this->additionalCardHolderFee = $additionalCardHolderFee;
  }
  public function getAdditionalCardHolderFee() {
    return $this->additionalCardHolderFee;
  }
  public function setAgeMinimum( $ageMinimum) {
    $this->ageMinimum = $ageMinimum;
  }
  public function getAgeMinimum() {
    return $this->ageMinimum;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setAnnualFee( $annualFee) {
    $this->annualFee = $annualFee;
  }
  public function getAnnualFee() {
    return $this->annualFee;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setAnnualRewardMaximum( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getAnnualRewardMaximum() {
    return $this->***REMOVED***;
  }
  public function setApprovedCategories(/* array(Google_string) */ $***REMOVED***) {
    $this->assertIsArray($***REMOVED***, 'Google_string', __METHOD__);
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getApprovedCategories() {
    return $this->***REMOVED***;
  }
  public function setAprDisplay( $aprDisplay) {
    $this->aprDisplay = $aprDisplay;
  }
  public function getAprDisplay() {
    return $this->aprDisplay;
  }
  public function setBalanceComputationMethod( $balanceComputationMethod) {
    $this->balanceComputationMethod = $balanceComputationMethod;
  }
  public function getBalanceComputationMethod() {
    return $this->balanceComputationMethod;
  }
  public function setBalanceTransferTerms( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getBalanceTransferTerms() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(/* array(Google_CcOfferBonusRewards) */ $bonusRewards) {
    $this->assertIsArray($bonusRewards, 'Google_CcOfferBonusRewards', __METHOD__);
    $this->bonusRewards = $bonusRewards;
  }
  public function ***REMOVED***() {
    return $this->bonusRewards;
  }
  public function setCarRentalInsurance( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getCarRentalInsurance() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(/* array(Google_string) */ $cardBenefits) {
    $this->assertIsArray($cardBenefits, 'Google_string', __METHOD__);
    $this->cardBenefits = $cardBenefits;
  }
  public function ***REMOVED***() {
    return $this->cardBenefits;
  }
  public function setCardName( $cardName) {
    $this->cardName = $cardName;
  }
  public function getCardName() {
    return $this->cardName;
  }
  public function setCardType( $cardType) {
    $this->cardType = $cardType;
  }
  public function getCardType() {
    return $this->cardType;
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
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setCreditRatingDisplay( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getCreditRatingDisplay() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(/* array(Google_CcOfferDefaultFees) */ $defaultFees) {
    $this->assertIsArray($defaultFees, 'Google_CcOfferDefaultFees', __METHOD__);
    $this->defaultFees = $defaultFees;
  }
  public function ***REMOVED***() {
    return $this->defaultFees;
  }
  public function setDisclaimer( $disclaimer) {
    $this->disclaimer = $disclaimer;
  }
  public function getDisclaimer() {
    return $this->disclaimer;
  }
  public function setEmergencyInsurance( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getEmergencyInsurance() {
    return $this->***REMOVED***;
  }
  public function setExistingCustomerOnly( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getExistingCustomerOnly() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setFirstYearAnnualFee( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getFirstYearAnnualFee() {
    return $this->***REMOVED***;
  }
  public function setFlightAccidentInsurance( $flightAccidentInsurance) {
    $this->flightAccidentInsurance = $flightAccidentInsurance;
  }
  public function getFlightAccidentInsurance() {
    return $this->flightAccidentInsurance;
  }
  public function setForeignCurrencyTransactionFee( $foreignCurrencyTransactionFee) {
    $this->foreignCurrencyTransactionFee = $foreignCurrencyTransactionFee;
  }
  public function getForeignCurrencyTransactionFee() {
    return $this->foreignCurrencyTransactionFee;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setGracePeriodDisplay( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getGracePeriodDisplay() {
    return $this->***REMOVED***;
  }
  public function setImageUrl( $imageUrl) {
    $this->imageUrl = $imageUrl;
  }
  public function getImageUrl() {
    return $this->imageUrl;
  }
  public function setInitialSetupAndProcessingFee( $initialSetupAndProcessingFee) {
    $this->initialSetupAndProcessingFee = $initialSetupAndProcessingFee;
  }
  public function getInitialSetupAndProcessingFee() {
    return $this->initialSetupAndProcessingFee;
  }
  public function setIntroBalanceTransferTerms( $introBalanceTransferTerms) {
    $this->introBalanceTransferTerms = $introBalanceTransferTerms;
  }
  public function getIntroBalanceTransferTerms() {
    return $this->introBalanceTransferTerms;
  }
  public function setIntroCashAdvanceTerms( $introCashAdvanceTerms) {
    $this->introCashAdvanceTerms = $introCashAdvanceTerms;
  }
  public function getIntroCashAdvanceTerms() {
    return $this->introCashAdvanceTerms;
  }
  public function setIntroPurchaseTerms( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getIntroPurchaseTerms() {
    return $this->***REMOVED***;
  }
  public function setIssuer( $issuer) {
    $this->issuer = $issuer;
  }
  public function getIssuer() {
    return $this->issuer;
  }
  public function setIssuerId( $issuerId) {
    $this->issuerId = $issuerId;
  }
  public function getIssuerId() {
    return $this->issuerId;
  }
  public function ***REMOVED***( $issuerWebsite) {
    $this->issuerWebsite = $issuerWebsite;
  }
  public function ***REMOVED***() {
    return $this->issuerWebsite;
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
  public function setMinimumFinanceCharge( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getMinimumFinanceCharge() {
    return $this->***REMOVED***;
  }
  public function setNetwork( $network) {
    $this->network = $network;
  }
  public function getNetwork() {
    return $this->network;
  }
  public function setOfferId( $offerId) {
    $this->offerId = $offerId;
  }
  public function getOfferId() {
    return $this->offerId;
  }
  public function setOffersImmediateCashReward( $offersImmediateCashReward) {
    $this->offersImmediateCashReward = $offersImmediateCashReward;
  }
  public function getOffersImmediateCashReward() {
    return $this->offersImmediateCashReward;
  }
  public function ***REMOVED***( $overLimitFee) {
    $this->overLimitFee = $overLimitFee;
  }
  public function ***REMOVED***() {
    return $this->overLimitFee;
  }
  public function setProhibitedCategories(/* array(Google_string) */ $***REMOVED***) {
    $this->assertIsArray($***REMOVED***, 'Google_string', __METHOD__);
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getProhibitedCategories() {
    return $this->***REMOVED***;
  }
  public function setPurchaseRateAdditionalDetails( $purchaseRateAdditionalDetails) {
    $this->purchaseRateAdditionalDetails = $purchaseRateAdditionalDetails;
  }
  public function getPurchaseRateAdditionalDetails() {
    return $this->purchaseRateAdditionalDetails;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setReturnedPaymentFee( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getReturnedPaymentFee() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $rewardPartner) {
    $this->rewardPartner = $rewardPartner;
  }
  public function ***REMOVED***() {
    return $this->rewardPartner;
  }
  public function setRewardUnit( $rewardUnit) {
    $this->rewardUnit = $rewardUnit;
  }
  public function getRewardUnit() {
    return $this->rewardUnit;
  }
  public function setRewards(/* array(Google_CcOfferRewards) */ $rewards) {
    $this->assertIsArray($rewards, 'Google_CcOfferRewards', __METHOD__);
    $this->rewards = $rewards;
  }
  public function getRewards() {
    return $this->rewards;
  }
  public function ***REMOVED***( $rewardsExpire) {
    $this->rewardsExpire = $rewardsExpire;
  }
  public function ***REMOVED***() {
    return $this->rewardsExpire;
  }
  public function setRewardsHaveBlackoutDates( $rewardsHaveBlackoutDates) {
    $this->rewardsHaveBlackoutDates = $rewardsHaveBlackoutDates;
  }
  public function getRewardsHaveBlackoutDates() {
    return $this->rewardsHaveBlackoutDates;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $trackingUrl) {
    $this->trackingUrl = $trackingUrl;
  }
  public function ***REMOVED***() {
    return $this->trackingUrl;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setVariableRatesLastUpdated( $variableRatesLastUpdated) {
    $this->variableRatesLastUpdated = $variableRatesLastUpdated;
  }
  public function getVariableRatesLastUpdated() {
    return $this->variableRatesLastUpdated;
  }
  public function setVariableRatesUpdateFrequency( $variableRatesUpdateFrequency) {
    $this->variableRatesUpdateFrequency = $variableRatesUpdateFrequency;
  }
  public function getVariableRatesUpdateFrequency() {
    return $this->variableRatesUpdateFrequency;
  }
}

class Google_CcOfferBonusRewards extends Google_Model {
  public $amount;
  public $details;
  public function setAmount( $amount) {
    $this->amount = $amount;
  }
  public function getAmount() {
    return $this->amount;
  }
  public function setDetails( $details) {
    $this->details = $details;
  }
  public function getDetails() {
    return $this->details;
  }
}

class Google_CcOfferDefaultFees extends Google_Model {
  public $category;
  public $maxRate;
  public $minRate;
  public $rateType;
  public function setCategory( $category) {
    $this->category = $category;
  }
  public function getCategory() {
    return $this->category;
  }
  public function setMaxRate( $maxRate) {
    $this->maxRate = $maxRate;
  }
  public function getMaxRate() {
    return $this->maxRate;
  }
  public function setMinRate( $minRate) {
    $this->minRate = $minRate;
  }
  public function getMinRate() {
    return $this->minRate;
  }
  public function setRateType( $rateType) {
    $this->rateType = $rateType;
  }
  public function getRateType() {
    return $this->rateType;
  }
}

class Google_CcOfferRewards extends Google_Model {
  public $***REMOVED***;
  public $amount;
  public $category;
  public $***REMOVED***;
  public $maxRewardTier;
  public $minRewardTier;
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setAmount( $amount) {
    $this->amount = $amount;
  }
  public function getAmount() {
    return $this->amount;
  }
  public function setCategory( $category) {
    $this->category = $category;
  }
  public function getCategory() {
    return $this->category;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $maxRewardTier) {
    $this->maxRewardTier = $maxRewardTier;
  }
  public function ***REMOVED***() {
    return $this->maxRewardTier;
  }
  public function ***REMOVED***( $minRewardTier) {
    $this->minRewardTier = $minRewardTier;
  }
  public function ***REMOVED***() {
    return $this->minRewardTier;
  }
}

class Google_CcOffers extends Google_Model {
  protected $__itemsType = 'Google_CcOffer';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public function setItems(/* array(Google_CcOffer) */ $items) {
    $this->assertIsArray($items, 'Google_CcOffer', __METHOD__);
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
}

class Google_Event extends Google_Model {
  public $advertiserId;
  public $***REMOVED***;
  public $chargeId;
  public $chargeType;
  protected $__commissionableSalesType = 'Google_Money';
  protected $__commissionableSalesDataType = '';
  public $***REMOVED***;
  protected $__earningsType = 'Google_Money';
  protected $__earningsDataType = '';
  public $earnings;
  public $eventDate;
  public $kind;
  public $memberId;
  public $modifyDate;
  protected $__networkFeeType = 'Google_Money';
  protected $__networkFeeDataType = '';
  public $networkFee;
  public $orderId;
  protected $__productsType = 'Google_EventProducts';
  protected $__productsDataType = 'array';
  public $products;
  protected $__publisherFeeType = 'Google_Money';
  protected $__publisherFeeDataType = '';
  public $publisherFee;
  public $publisherId;
  public $publisherName;
  public $status;
  public $type;
  public function ***REMOVED***( $advertiserId) {
    $this->advertiserId = $advertiserId;
  }
  public function ***REMOVED***() {
    return $this->advertiserId;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setChargeId( $chargeId) {
    $this->chargeId = $chargeId;
  }
  public function getChargeId() {
    return $this->chargeId;
  }
  public function setChargeType( $chargeType) {
    $this->chargeType = $chargeType;
  }
  public function getChargeType() {
    return $this->chargeType;
  }
  public function setCommissionableSales(Google_Money $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getCommissionableSales() {
    return $this->***REMOVED***;
  }
  public function setEarnings(Google_Money $earnings) {
    $this->earnings = $earnings;
  }
  public function getEarnings() {
    return $this->earnings;
  }
  public function setEventDate( $eventDate) {
    $this->eventDate = $eventDate;
  }
  public function getEventDate() {
    return $this->eventDate;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setMemberId( $memberId) {
    $this->memberId = $memberId;
  }
  public function getMemberId() {
    return $this->memberId;
  }
  public function setModifyDate( $modifyDate) {
    $this->modifyDate = $modifyDate;
  }
  public function getModifyDate() {
    return $this->modifyDate;
  }
  public function setNetworkFee(Google_Money $networkFee) {
    $this->networkFee = $networkFee;
  }
  public function getNetworkFee() {
    return $this->networkFee;
  }
  public function setOrderId( $orderId) {
    $this->orderId = $orderId;
  }
  public function getOrderId() {
    return $this->orderId;
  }
  public function setProducts(/* array(Google_EventProducts) */ $products) {
    $this->assertIsArray($products, 'Google_EventProducts', __METHOD__);
    $this->products = $products;
  }
  public function getProducts() {
    return $this->products;
  }
  public function ***REMOVED***(Google_Money $publisherFee) {
    $this->publisherFee = $publisherFee;
  }
  public function ***REMOVED***() {
    return $this->publisherFee;
  }
  public function ***REMOVED***( $publisherId) {
    $this->publisherId = $publisherId;
  }
  public function ***REMOVED***() {
    return $this->publisherId;
  }
  public function ***REMOVED***( $publisherName) {
    $this->publisherName = $publisherName;
  }
  public function ***REMOVED***() {
    return $this->publisherName;
  }
  public function setStatus( $status) {
    $this->status = $status;
  }
  public function getStatus() {
    return $this->status;
  }
  public function setType( $type) {
    $this->type = $type;
  }
  public function getType() {
    return $this->type;
  }
}

class Google_EventProducts extends Google_Model {
  public $categoryId;
  public $categoryName;
  protected $__earningsType = 'Google_Money';
  protected $__earningsDataType = '';
  public $earnings;
  protected $__networkFeeType = 'Google_Money';
  protected $__networkFeeDataType = '';
  public $networkFee;
  protected $__publisherFeeType = 'Google_Money';
  protected $__publisherFeeDataType = '';
  public $publisherFee;
  public $quantity;
  public $sku;
  public $skuName;
  protected $__unitPriceType = 'Google_Money';
  protected $__unitPriceDataType = '';
  public $unitPrice;
  public function setCategoryId( $categoryId) {
    $this->categoryId = $categoryId;
  }
  public function getCategoryId() {
    return $this->categoryId;
  }
  public function ***REMOVED***( $categoryName) {
    $this->categoryName = $categoryName;
  }
  public function ***REMOVED***() {
    return $this->categoryName;
  }
  public function setEarnings(Google_Money $earnings) {
    $this->earnings = $earnings;
  }
  public function getEarnings() {
    return $this->earnings;
  }
  public function setNetworkFee(Google_Money $networkFee) {
    $this->networkFee = $networkFee;
  }
  public function getNetworkFee() {
    return $this->networkFee;
  }
  public function ***REMOVED***(Google_Money $publisherFee) {
    $this->publisherFee = $publisherFee;
  }
  public function ***REMOVED***() {
    return $this->publisherFee;
  }
  public function setQuantity( $quantity) {
    $this->quantity = $quantity;
  }
  public function getQuantity() {
    return $this->quantity;
  }
  public function setSku( $sku) {
    $this->sku = $sku;
  }
  public function getSku() {
    return $this->sku;
  }
  public function setSkuName( $skuName) {
    $this->skuName = $skuName;
  }
  public function getSkuName() {
    return $this->skuName;
  }
  public function setUnitPrice(Google_Money $unitPrice) {
    $this->unitPrice = $unitPrice;
  }
  public function getUnitPrice() {
    return $this->unitPrice;
  }
}

class Google_Events extends Google_Model {
  protected $__itemsType = 'Google_Event';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public $nextPageToken;
  public function setItems(/* array(Google_Event) */ $items) {
    $this->assertIsArray($items, 'Google_Event', __METHOD__);
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

class Google_Link extends Google_Model {
  public $advertiserId;
  public $authorship;
  public $availability;
  public $***REMOVED***;
  public $createDate;
  public $description;
  public $***REMOVED***;
  public $duration;
  public $endDate;
  protected $__epcNinetyDayAverageType = 'Google_Money';
  protected $__epcNinetyDayAverageDataType = '';
  public $***REMOVED***;
  protected $__epcSevenDayAverageType = 'Google_Money';
  protected $__epcSevenDayAverageDataType = '';
  public $***REMOVED***;
  public $id;
  public $imageAltText;
  public $impressionTrackingUrl;
  public $isActive;
  public $kind;
  public $linkType;
  public $name;
  public $promotionType;
  protected $__specialOffersType = 'Google_LinkSpecialOffers';
  protected $__specialOffersDataType = '';
  public $specialOffers;
  public $startDate;
  public function ***REMOVED***( $advertiserId) {
    $this->advertiserId = $advertiserId;
  }
  public function ***REMOVED***() {
    return $this->advertiserId;
  }
  public function setAuthorship( $authorship) {
    $this->authorship = $authorship;
  }
  public function getAuthorship() {
    return $this->authorship;
  }
  public function ***REMOVED***( $availability) {
    $this->availability = $availability;
  }
  public function ***REMOVED***() {
    return $this->availability;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setCreateDate( $createDate) {
    $this->createDate = $createDate;
  }
  public function getCreateDate() {
    return $this->createDate;
  }
  public function ***REMOVED***( $description) {
    $this->description = $description;
  }
  public function ***REMOVED***() {
    return $this->description;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setDuration( $duration) {
    $this->duration = $duration;
  }
  public function getDuration() {
    return $this->duration;
  }
  public function setEndDate( $endDate) {
    $this->endDate = $endDate;
  }
  public function getEndDate() {
    return $this->endDate;
  }
  public function setEpcNinetyDayAverage(Google_Money $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getEpcNinetyDayAverage() {
    return $this->***REMOVED***;
  }
  public function setEpcSevenDayAverage(Google_Money $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getEpcSevenDayAverage() {
    return $this->***REMOVED***;
  }
  public function setId( $id) {
    $this->id = $id;
  }
  public function getId() {
    return $this->id;
  }
  public function ***REMOVED***( $imageAltText) {
    $this->imageAltText = $imageAltText;
  }
  public function ***REMOVED***() {
    return $this->imageAltText;
  }
  public function setImpressionTrackingUrl( $impressionTrackingUrl) {
    $this->impressionTrackingUrl = $impressionTrackingUrl;
  }
  public function getImpressionTrackingUrl() {
    return $this->impressionTrackingUrl;
  }
  public function setIsActive( $isActive) {
    $this->isActive = $isActive;
  }
  public function getIsActive() {
    return $this->isActive;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setLinkType( $linkType) {
    $this->linkType = $linkType;
  }
  public function getLinkType() {
    return $this->linkType;
  }
  public function setName( $name) {
    $this->name = $name;
  }
  public function getName() {
    return $this->name;
  }
  public function ***REMOVED***( $promotionType) {
    $this->promotionType = $promotionType;
  }
  public function ***REMOVED***() {
    return $this->promotionType;
  }
  public function ***REMOVED***(Google_LinkSpecialOffers $specialOffers) {
    $this->specialOffers = $specialOffers;
  }
  public function ***REMOVED***() {
    return $this->specialOffers;
  }
  public function setStartDate( $startDate) {
    $this->startDate = $startDate;
  }
  public function getStartDate() {
    return $this->startDate;
  }
}

class Google_LinkSpecialOffers extends Google_Model {
  public $freeGift;
  public $freeShipping;
  protected $__freeShippingMinType = 'Google_Money';
  protected $__freeShippingMinDataType = '';
  public $***REMOVED***;
  public $percentOff;
  protected $__percentOffMinType = 'Google_Money';
  protected $__percentOffMinDataType = '';
  public $percentOffMin;
  protected $__priceCutType = 'Google_Money';
  protected $__priceCutDataType = '';
  public $priceCut;
  protected $__priceCutMinType = 'Google_Money';
  protected $__priceCutMinDataType = '';
  public $priceCutMin;
  public $***REMOVED***;
  public function setFreeGift( $freeGift) {
    $this->freeGift = $freeGift;
  }
  public function getFreeGift() {
    return $this->freeGift;
  }
  public function ***REMOVED***( $freeShipping) {
    $this->freeShipping = $freeShipping;
  }
  public function ***REMOVED***() {
    return $this->freeShipping;
  }
  public function ***REMOVED***(Google_Money $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setPercentOff( $percentOff) {
    $this->percentOff = $percentOff;
  }
  public function getPercentOff() {
    return $this->percentOff;
  }
  public function ***REMOVED***(Google_Money $percentOffMin) {
    $this->percentOffMin = $percentOffMin;
  }
  public function ***REMOVED***() {
    return $this->percentOffMin;
  }
  public function setPriceCut(Google_Money $priceCut) {
    $this->priceCut = $priceCut;
  }
  public function getPriceCut() {
    return $this->priceCut;
  }
  public function ***REMOVED***(Google_Money $priceCutMin) {
    $this->priceCutMin = $priceCutMin;
  }
  public function ***REMOVED***() {
    return $this->priceCutMin;
  }
  public function ***REMOVED***(/* array(Google_string) */ $***REMOVED***) {
    $this->assertIsArray($***REMOVED***, 'Google_string', __METHOD__);
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
}

class Google_Links extends Google_Model {
  protected $__itemsType = 'Google_Link';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public $nextPageToken;
  public function setItems(/* array(Google_Link) */ $items) {
    $this->assertIsArray($items, 'Google_Link', __METHOD__);
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

class Google_Money extends Google_Model {
  public $amount;
  public $currencyCode;
  public function setAmount( $amount) {
    $this->amount = $amount;
  }
  public function getAmount() {
    return $this->amount;
  }
  public function ***REMOVED***( $currencyCode) {
    $this->currencyCode = $currencyCode;
  }
  public function ***REMOVED***() {
    return $this->currencyCode;
  }
}

class Google_Publisher extends Google_Model {
  public $***REMOVED***;
  protected $__epcNinetyDayAverageType = 'Google_Money';
  protected $__epcNinetyDayAverageDataType = '';
  public $***REMOVED***;
  protected $__epcSevenDayAverageType = 'Google_Money';
  protected $__epcSevenDayAverageDataType = '';
  public $***REMOVED***;
  public $id;
  protected $__itemType = 'Google_Publisher';
  protected $__itemDataType = '';
  public $item;
  public $joinDate;
  public $kind;
  public $name;
  public $payoutRank;
  public $sites;
  public $status;
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setEpcNinetyDayAverage(Google_Money $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getEpcNinetyDayAverage() {
    return $this->***REMOVED***;
  }
  public function setEpcSevenDayAverage(Google_Money $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getEpcSevenDayAverage() {
    return $this->***REMOVED***;
  }
  public function setId( $id) {
    $this->id = $id;
  }
  public function getId() {
    return $this->id;
  }
  public function setItem(Google_Publisher $item) {
    $this->item = $item;
  }
  public function getItem() {
    return $this->item;
  }
  public function setJoinDate( $joinDate) {
    $this->joinDate = $joinDate;
  }
  public function getJoinDate() {
    return $this->joinDate;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setName( $name) {
    $this->name = $name;
  }
  public function getName() {
    return $this->name;
  }
  public function setPayoutRank( $payoutRank) {
    $this->payoutRank = $payoutRank;
  }
  public function getPayoutRank() {
    return $this->payoutRank;
  }
  public function setSites(/* array(Google_string) */ $sites) {
    $this->assertIsArray($sites, 'Google_string', __METHOD__);
    $this->sites = $sites;
  }
  public function getSites() {
    return $this->sites;
  }
  public function setStatus( $status) {
    $this->status = $status;
  }
  public function getStatus() {
    return $this->status;
  }
}

class Google_Publishers extends Google_Model {
  protected $__itemsType = 'Google_Publisher';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public $nextPageToken;
  public function setItems(/* array(Google_Publisher) */ $items) {
    $this->assertIsArray($items, 'Google_Publisher', __METHOD__);
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

class Google_Report extends Google_Model {
  public $column_names;
  public $end_date;
  public $kind;
  public $matching_row_count;
  public $rows;
  public $start_date;
  public $totals_rows;
  public $type;
  public function setColumn_names(/* array(Google_string) */ $column_names) {
    $this->assertIsArray($column_names, 'Google_string', __METHOD__);
    $this->column_names = $column_names;
  }
  public function getColumn_names() {
    return $this->column_names;
  }
  public function setEnd_date( $end_date) {
    $this->end_date = $end_date;
  }
  public function getEnd_date() {
    return $this->end_date;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setMatching_row_count( $matching_row_count) {
    $this->matching_row_count = $matching_row_count;
  }
  public function getMatching_row_count() {
    return $this->matching_row_count;
  }
  public function setRows(/* array(Google_object) */ $rows) {
    $this->assertIsArray($rows, 'Google_object', __METHOD__);
    $this->rows = $rows;
  }
  public function getRows() {
    return $this->rows;
  }
  public function setStart_date( $start_date) {
    $this->start_date = $start_date;
  }
  public function getStart_date() {
    return $this->start_date;
  }
  public function setTotals_rows(/* array(Google_object) */ $totals_rows) {
    $this->assertIsArray($totals_rows, 'Google_object', __METHOD__);
    $this->totals_rows = $totals_rows;
  }
  public function getTotals_rows() {
    return $this->totals_rows;
  }
  public function setType( $type) {
    $this->type = $type;
  }
  public function getType() {
    return $this->type;
  }
}
