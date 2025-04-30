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
   * The "bookshelves" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $bookshelves = $booksService->bookshelves;
   *  </code>
   */
  class Google_BookshelvesServiceResource extends Google_ServiceResource {

    /**
     * Retrieves metadata for a specific bookshelf for the specified user. (bookshelves.get)
     *
     * @param string $userId ID of user for whom to retrieve bookshelves.
     * @param string $shelf ID of bookshelf to retrieve.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Bookshelf
     */
    public function get($userId, $shelf, $optParams = array()) {
      $params = array('userId' => $userId, 'shelf' => $shelf);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Bookshelf($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves a list of public bookshelves for the specified user. (bookshelves.list)
     *
     * @param string $userId ID of user for whom to retrieve bookshelves.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Bookshelves
     */
    public function ***REMOVED***($userId, $optParams = array()) {
      $params = array('userId' => $userId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Bookshelves($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "volumes" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $volumes = $booksService->volumes;
   *  </code>
   */
  class Google_BookshelvesVolumesServiceResource extends Google_ServiceResource {

    /**
     * Retrieves volumes in a specific bookshelf for the specified user. (volumes.list)
     *
     * @param string $userId ID of user for whom to retrieve bookshelf volumes.
     * @param string $shelf ID of bookshelf to retrieve volumes.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string maxResults Maximum number of results to return
     * @opt_param bool showPreorders Set to true to show pre-ordered books. Defaults to false.
     * @opt_param string source String to identify the originator of this request.
     * @opt_param string startIndex Index of the first element to return (starts at 0)
     * @return Google_Volumes
     */
    public function listBookshelvesVolumes($userId, $shelf, $optParams = array()) {
      $params = array('userId' => $userId, 'shelf' => $shelf);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Volumes($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "cloudloading" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $cloudloading = $booksService->cloudloading;
   *  </code>
   */
  class Google_CloudloadingServiceResource extends Google_ServiceResource {

    /**
     * (cloudloading.addBook)
     *
     * @param array $optParams Optional parameters.
     *
     * @opt_param string drive_document_id A drive document id. The upload_client_token must not be set.
     * @opt_param string mime_type The document MIME type. It can be set only if the drive_document_id is set.
     * @opt_param string name The document name. It can be set only if the drive_document_id is set.
     * @opt_param string upload_client_token
     * @return Google_BooksCloudloadingResource
     */
    public function addBook($optParams = array()) {
      $params = array();
      $params = array_merge($params, $optParams);
      $data = $this->__call('addBook', array($params));
      if ($this->useObjects()) {
        return new Google_BooksCloudloadingResource($data);
      } else {
        return $data;
      }
    }
    /**
     * Remove the book and its contents (cloudloading.deleteBook)
     *
     * @param string $volumeId The id of the book to be removed.
     * @param array $optParams Optional parameters.
     */
    public function deleteBook($volumeId, $optParams = array()) {
      $params = array('volumeId' => $volumeId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('deleteBook', array($params));
      return $data;
    }
    /**
     * (cloudloading.updateBook)
     *
     * @param Google_BooksCloudloadingResource $postBody
     * @param array $optParams Optional parameters.
     * @return Google_BooksCloudloadingResource
     */
    public function updateBook(Google_BooksCloudloadingResource $postBody, $optParams = array()) {
      $params = array('postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('updateBook', array($params));
      if ($this->useObjects()) {
        return new Google_BooksCloudloadingResource($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "layers" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $layers = $booksService->layers;
   *  </code>
   */
  class Google_LayersServiceResource extends Google_ServiceResource {

    /**
     * Gets the layer summary for a volume. (layers.get)
     *
     * @param string $volumeId The volume to retrieve layers for.
     * @param string $summaryId The ID for the layer to get the summary for.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string ***REMOVED*** The content version for the requested volume.
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Layersummary
     */
    public function get($volumeId, $summaryId, $optParams = array()) {
      $params = array('volumeId' => $volumeId, 'summaryId' => $summaryId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Layersummary($data);
      } else {
        return $data;
      }
    }
    /**
     * List the layer summaries for a volume. (layers.list)
     *
     * @param string $volumeId The volume to retrieve layers for.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string ***REMOVED*** The content version for the requested volume.
     * @opt_param string maxResults Maximum number of results to return
     * @opt_param string pageToken The value of the nextToken from the previous page.
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Layersummaries
     */
    public function listLayers($volumeId, $optParams = array()) {
      $params = array('volumeId' => $volumeId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Layersummaries($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "***REMOVED***" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $***REMOVED*** = $booksService->***REMOVED***;
   *  </code>
   */
  class Google_LayersAnnotationDataServiceResource extends Google_ServiceResource {

    /**
     * Gets the annotation data. (***REMOVED***.get)
     *
     * @param string $volumeId The volume to retrieve annotations for.
     * @param string $layerId The ID for the layer to get the annotations.
     * @param string $***REMOVED*** The ID of the annotation data to retrieve.
     * @param string $***REMOVED*** The content version for the volume you are trying to retrieve.
     * @param array $optParams Optional parameters.
     *
     * @opt_param int h The requested pixel height for any images. If height is provided width must also be provided.
     * @opt_param string locale The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'.
     * @opt_param int scale The requested scale for the image.
     * @opt_param string source String to identify the originator of this request.
     * @opt_param int w The requested pixel width for any images. If width is provided height must also be provided.
     * @return Google_Annotationdata
     */
    public function get($volumeId, $layerId, $***REMOVED***, $***REMOVED***, $optParams = array()) {
      $params = array('volumeId' => $volumeId, 'layerId' => $layerId, '***REMOVED***' => $***REMOVED***, '***REMOVED***' => $***REMOVED***);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Annotationdata($data);
      } else {
        return $data;
      }
    }
    /**
     * Gets the annotation data for a volume and layer. (***REMOVED***.list)
     *
     * @param string $volumeId The volume to retrieve annotation data for.
     * @param string $layerId The ID for the layer to get the annotation data.
     * @param string $***REMOVED*** The content version for the requested volume.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string ***REMOVED*** The list of Annotation Data Ids to retrieve. Pagination is ignored if this is set.
     * @opt_param int h The requested pixel height for any images. If height is provided width must also be provided.
     * @opt_param string locale The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'.
     * @opt_param string maxResults Maximum number of results to return
     * @opt_param string pageToken The value of the nextToken from the previous page.
     * @opt_param int scale The requested scale for the image.
     * @opt_param string source String to identify the originator of this request.
     * @opt_param string updatedMax RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive).
     * @opt_param string updatedMin RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive).
     * @opt_param int w The requested pixel width for any images. If width is provided height must also be provided.
     * @return Google_Annotationsdata
     */
    public function listLayersAnnotationData($volumeId, $layerId, $***REMOVED***, $optParams = array()) {
      $params = array('volumeId' => $volumeId, 'layerId' => $layerId, '***REMOVED***' => $***REMOVED***);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Annotationsdata($data);
      } else {
        return $data;
      }
    }
  }
  /**
   * The "***REMOVED***" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $***REMOVED*** = $booksService->***REMOVED***;
   *  </code>
   */
  class Google_LayersVolumeAnnotationsServiceResource extends Google_ServiceResource {

    /**
     * Gets the volume annotation. (***REMOVED***.get)
     *
     * @param string $volumeId The volume to retrieve annotations for.
     * @param string $layerId The ID for the layer to get the annotations.
     * @param string $annotationId The ID of the volume annotation to retrieve.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string locale The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'.
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Volumeannotation
     */
    public function get($volumeId, $layerId, $annotationId, $optParams = array()) {
      $params = array('volumeId' => $volumeId, 'layerId' => $layerId, 'annotationId' => $annotationId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Volumeannotation($data);
      } else {
        return $data;
      }
    }
    /**
     * Gets the volume annotations for a volume and layer. (***REMOVED***.list)
     *
     * @param string $volumeId The volume to retrieve annotations for.
     * @param string $layerId The ID for the layer to get the annotations.
     * @param string $***REMOVED*** The content version for the requested volume.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string endOffset The end offset to end retrieving data from.
     * @opt_param string endPosition The end position to end retrieving data from.
     * @opt_param string locale The locale information for the data. ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'.
     * @opt_param string maxResults Maximum number of results to return
     * @opt_param string pageToken The value of the nextToken from the previous page.
     * @opt_param bool showDeleted Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false.
     * @opt_param string source String to identify the originator of this request.
     * @opt_param string startOffset The start offset to start retrieving data from.
     * @opt_param string startPosition The start position to start retrieving data from.
     * @opt_param string updatedMax RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive).
     * @opt_param string updatedMin RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive).
     * @opt_param string volumeAnnotationsVersion The version of the volume annotations that you are requesting.
     * @return Google_Volumeannotations
     */
    public function listLayersVolumeAnnotations($volumeId, $layerId, $***REMOVED***, $optParams = array()) {
      $params = array('volumeId' => $volumeId, 'layerId' => $layerId, '***REMOVED***' => $***REMOVED***);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Volumeannotations($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "myconfig" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $myconfig = $booksService->myconfig;
   *  </code>
   */
  class Google_MyconfigServiceResource extends Google_ServiceResource {

    /**
     * Release downloaded content access restriction. (myconfig.releaseDownloadAccess)
     *
     * @param string $volumeIds The volume(s) to release restrictions for.
     * @param string $cpksver The device/version ID from which to release the restriction.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string locale ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US.
     * @opt_param string source String to identify the originator of this request.
     * @return Google_DownloadAccesses
     */
    public function releaseDownloadAccess($volumeIds, $cpksver, $optParams = array()) {
      $params = array('volumeIds' => $volumeIds, 'cpksver' => $cpksver);
      $params = array_merge($params, $optParams);
      $data = $this->__call('releaseDownloadAccess', array($params));
      if ($this->useObjects()) {
        return new Google_DownloadAccesses($data);
      } else {
        return $data;
      }
    }
    /**
     * Request concurrent and download access restrictions. (myconfig.requestAccess)
     *
     * @param string $source String to identify the originator of this request.
     * @param string $volumeId The volume to request concurrent/download restrictions for.
     * @param string $nonce The client nonce value.
     * @param string $cpksver The device/version ID from which to request the restrictions.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string locale ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US.
     * @return Google_RequestAccess
     */
    public function requestAccess($source, $volumeId, $nonce, $cpksver, $optParams = array()) {
      $params = array('source' => $source, 'volumeId' => $volumeId, 'nonce' => $nonce, 'cpksver' => $cpksver);
      $params = array_merge($params, $optParams);
      $data = $this->__call('requestAccess', array($params));
      if ($this->useObjects()) {
        return new Google_RequestAccess($data);
      } else {
        return $data;
      }
    }
    /**
     * Request downloaded content access for specified volumes on the My eBooks shelf.
     * (myconfig.***REMOVED***)
     *
     * @param string $source String to identify the originator of this request.
     * @param string $nonce The client nonce value.
     * @param string $cpksver The device/version ID from which to release the restriction.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string locale ISO-639-1, ISO-3166-1 codes for message localization, i.e. en_US.
     * @opt_param bool showPreorders Set to true to show pre-ordered books. Defaults to false.
     * @opt_param string volumeIds The volume(s) to request download restrictions for.
     * @return Google_Volumes
     */
    public function ***REMOVED***($source, $nonce, $cpksver, $optParams = array()) {
      $params = array('source' => $source, 'nonce' => $nonce, 'cpksver' => $cpksver);
      $params = array_merge($params, $optParams);
      $data = $this->__call('***REMOVED***', array($params));
      if ($this->useObjects()) {
        return new Google_Volumes($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "mylibrary" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $mylibrary = $booksService->mylibrary;
   *  </code>
   */
  class Google_MylibraryServiceResource extends Google_ServiceResource {

  }

  /**
   * The "annotations" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $annotations = $booksService->annotations;
   *  </code>
   */
  class Google_MylibraryAnnotationsServiceResource extends Google_ServiceResource {

    /**
     * Deletes an annotation. (annotations.delete)
     *
     * @param string $annotationId The ID for the annotation to delete.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     */
    public function delete($annotationId, $optParams = array()) {
      $params = array('annotationId' => $annotationId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('delete', array($params));
      return $data;
    }
    /**
     * Gets an annotation by its ID. (annotations.get)
     *
     * @param string $annotationId The ID for the annotation to retrieve.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Annotation
     */
    public function get($annotationId, $optParams = array()) {
      $params = array('annotationId' => $annotationId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Annotation($data);
      } else {
        return $data;
      }
    }
    /**
     * Inserts a new annotation. (annotations.insert)
     *
     * @param Google_Annotation $postBody
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Annotation
     */
    public function insert(Google_Annotation $postBody, $optParams = array()) {
      $params = array('postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('insert', array($params));
      if ($this->useObjects()) {
        return new Google_Annotation($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves a list of annotations, possibly filtered. (annotations.list)
     *
     * @param array $optParams Optional parameters.
     *
     * @opt_param string ***REMOVED*** The content version for the requested volume.
     * @opt_param string layerId The layer ID to limit annotation by.
     * @opt_param string maxResults Maximum number of results to return
     * @opt_param string pageIds The page ID(s) for the volume that is being queried.
     * @opt_param string pageToken The value of the nextToken from the previous page.
     * @opt_param bool showDeleted Set to true to return deleted annotations. updatedMin must be in the request to use this. Defaults to false.
     * @opt_param string source String to identify the originator of this request.
     * @opt_param string updatedMax RFC 3339 timestamp to restrict to items updated prior to this timestamp (exclusive).
     * @opt_param string updatedMin RFC 3339 timestamp to restrict to items updated since this timestamp (inclusive).
     * @opt_param string volumeId The volume to restrict annotations to.
     * @return Google_Annotations
     */
    public function listMylibraryAnnotations($optParams = array()) {
      $params = array();
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Annotations($data);
      } else {
        return $data;
      }
    }
    /**
     * Updates an existing annotation. (annotations.update)
     *
     * @param string $annotationId The ID for the annotation to update.
     * @param Google_Annotation $postBody
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Annotation
     */
    public function update($annotationId, Google_Annotation $postBody, $optParams = array()) {
      $params = array('annotationId' => $annotationId, 'postBody' => $postBody);
      $params = array_merge($params, $optParams);
      $data = $this->__call('update', array($params));
      if ($this->useObjects()) {
        return new Google_Annotation($data);
      } else {
        return $data;
      }
    }
  }
  /**
   * The "bookshelves" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $bookshelves = $booksService->bookshelves;
   *  </code>
   */
  class Google_MylibraryBookshelvesServiceResource extends Google_ServiceResource {

    /**
     * Adds a volume to a bookshelf. (bookshelves.addVolume)
     *
     * @param string $shelf ID of bookshelf to which to add a volume.
     * @param string $volumeId ID of volume to add.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     */
    public function addVolume($shelf, $volumeId, $optParams = array()) {
      $params = array('shelf' => $shelf, 'volumeId' => $volumeId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('addVolume', array($params));
      return $data;
    }
    /**
     * Clears all volumes from a bookshelf. (bookshelves.clearVolumes)
     *
     * @param string $shelf ID of bookshelf from which to remove a volume.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     */
    public function clearVolumes($shelf, $optParams = array()) {
      $params = array('shelf' => $shelf);
      $params = array_merge($params, $optParams);
      $data = $this->__call('clearVolumes', array($params));
      return $data;
    }
    /**
     * Retrieves metadata for a specific bookshelf belonging to the authenticated user.
     * (bookshelves.get)
     *
     * @param string $shelf ID of bookshelf to retrieve.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Bookshelf
     */
    public function get($shelf, $optParams = array()) {
      $params = array('shelf' => $shelf);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Bookshelf($data);
      } else {
        return $data;
      }
    }
    /**
     * Retrieves a list of bookshelves belonging to the authenticated user. (bookshelves.list)
     *
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Bookshelves
     */
    public function listMylibraryBookshelves($optParams = array()) {
      $params = array();
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Bookshelves($data);
      } else {
        return $data;
      }
    }
    /**
     * Moves a volume within a bookshelf. (bookshelves.moveVolume)
     *
     * @param string $shelf ID of bookshelf with the volume.
     * @param string $volumeId ID of volume to move.
     * @param int $***REMOVED*** Position on shelf to move the item (0 puts the item before the current first item, 1 puts it between the first and the second and so on.)
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     */
    public function moveVolume($shelf, $volumeId, $***REMOVED***, $optParams = array()) {
      $params = array('shelf' => $shelf, 'volumeId' => $volumeId, '***REMOVED***' => $***REMOVED***);
      $params = array_merge($params, $optParams);
      $data = $this->__call('moveVolume', array($params));
      return $data;
    }
    /**
     * Removes a volume from a bookshelf. (bookshelves.removeVolume)
     *
     * @param string $shelf ID of bookshelf from which to remove a volume.
     * @param string $volumeId ID of volume to remove.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string source String to identify the originator of this request.
     */
    public function removeVolume($shelf, $volumeId, $optParams = array()) {
      $params = array('shelf' => $shelf, 'volumeId' => $volumeId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('removeVolume', array($params));
      return $data;
    }
  }

  /**
   * The "volumes" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $volumes = $booksService->volumes;
   *  </code>
   */
  class Google_MylibraryBookshelvesVolumesServiceResource extends Google_ServiceResource {

    /**
     * Gets volume information for volumes on a bookshelf. (volumes.list)
     *
     * @param string $shelf The bookshelf ID or name retrieve volumes for.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string country ISO-3166-1 code to override the IP-based location.
     * @opt_param string maxResults Maximum number of results to return
     * @opt_param string projection Restrict information returned to a set of selected fields.
     * @opt_param string q Full-text search query string in this bookshelf.
     * @opt_param bool showPreorders Set to true to show pre-ordered books. Defaults to false.
     * @opt_param string source String to identify the originator of this request.
     * @opt_param string startIndex Index of the first element to return (starts at 0)
     * @return Google_Volumes
     */
    public function listMylibraryBookshelvesVolumes($shelf, $optParams = array()) {
      $params = array('shelf' => $shelf);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Volumes($data);
      } else {
        return $data;
      }
    }
  }
  /**
   * The "***REMOVED***" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $***REMOVED*** = $booksService->***REMOVED***;
   *  </code>
   */
  class Google_MylibraryReadingpositionsServiceResource extends Google_ServiceResource {

    /**
     * Retrieves my reading position information for a volume. (***REMOVED***.get)
     *
     * @param string $volumeId ID of volume for which to retrieve a reading position.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string ***REMOVED*** Volume content version for which this reading position is requested.
     * @opt_param string source String to identify the originator of this request.
     * @return Google_ReadingPosition
     */
    public function get($volumeId, $optParams = array()) {
      $params = array('volumeId' => $volumeId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_ReadingPosition($data);
      } else {
        return $data;
      }
    }
    /**
     * Sets my reading position information for a volume. (***REMOVED***.setPosition)
     *
     * @param string $volumeId ID of volume for which to update the reading position.
     * @param string $timestamp RFC 3339 UTC format timestamp associated with this reading position.
     * @param string $position Position string for the new volume reading position.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string action Action that caused this reading position to be set.
     * @opt_param string ***REMOVED*** Volume content version for which this reading position applies.
     * @opt_param string deviceCookie Random persistent device cookie optional on set position.
     * @opt_param string source String to identify the originator of this request.
     */
    public function setPosition($volumeId, $timestamp, $position, $optParams = array()) {
      $params = array('volumeId' => $volumeId, 'timestamp' => $timestamp, 'position' => $position);
      $params = array_merge($params, $optParams);
      $data = $this->__call('setPosition', array($params));
      return $data;
    }
  }

  /**
   * The "volumes" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $volumes = $booksService->volumes;
   *  </code>
   */
  class Google_VolumesServiceResource extends Google_ServiceResource {

    /**
     * Gets volume information for a single volume. (volumes.get)
     *
     * @param string $volumeId ID of volume to retrieve.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string country ISO-3166-1 code to override the IP-based location.
     * @opt_param string partner Brand results for partner ID.
     * @opt_param string projection Restrict information returned to a set of selected fields.
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Volume
     */
    public function get($volumeId, $optParams = array()) {
      $params = array('volumeId' => $volumeId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('get', array($params));
      if ($this->useObjects()) {
        return new Google_Volume($data);
      } else {
        return $data;
      }
    }
    /**
     * Performs a book search. (volumes.list)
     *
     * @param string $q Full-text search query string.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string download Restrict to volumes by download availability.
     * @opt_param string filter Filter search results.
     * @opt_param string langRestrict Restrict results to books with this language code.
     * @opt_param string ***REMOVED*** Restrict search to this user's library.
     * @opt_param string maxResults Maximum number of results to return.
     * @opt_param string orderBy Sort search results.
     * @opt_param string partner Restrict and brand results for partner ID.
     * @opt_param string printType Restrict to books or magazines.
     * @opt_param string projection Restrict information returned to a set of selected fields.
     * @opt_param bool showPreorders Set to true to show books available for preorder. Defaults to false.
     * @opt_param string source String to identify the originator of this request.
     * @opt_param string startIndex Index of the first result to return (starts at 0)
     * @return Google_Volumes
     */
    public function listVolumes($q, $optParams = array()) {
      $params = array('q' => $q);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Volumes($data);
      } else {
        return $data;
      }
    }
  }

  /**
   * The "associated" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $associated = $booksService->associated;
   *  </code>
   */
  class Google_VolumesAssociatedServiceResource extends Google_ServiceResource {

    /**
     * Return a list of associated books. (associated.list)
     *
     * @param string $volumeId ID of the source volume.
     * @param array $optParams Optional parameters.
     *
     * @opt_param string association Association type.
     * @opt_param string locale ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating ***REMOVED***.
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Volumes
     */
    public function listVolumesAssociated($volumeId, $optParams = array()) {
      $params = array('volumeId' => $volumeId);
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Volumes($data);
      } else {
        return $data;
      }
    }
  }
  /**
   * The "mybooks" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $mybooks = $booksService->mybooks;
   *  </code>
   */
  class Google_VolumesMybooksServiceResource extends Google_ServiceResource {

    /**
     * Return a list of books in My Library. (mybooks.list)
     *
     * @param array $optParams Optional parameters.
     *
     * @opt_param string acquireMethod How the book was aquired
     * @opt_param string locale ISO-639-1 language and ISO-3166-1 country code. Ex:'en_US'. Used for generating ***REMOVED***.
     * @opt_param string maxResults Maximum number of results to return.
     * @opt_param string ***REMOVED*** The processing state of the user uploaded volumes to be returned. Applicable only if the UPLOADED is specified in the acquireMethod.
     * @opt_param string source String to identify the originator of this request.
     * @opt_param string startIndex Index of the first result to return (starts at 0)
     * @return Google_Volumes
     */
    public function ***REMOVED***($optParams = array()) {
      $params = array();
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Volumes($data);
      } else {
        return $data;
      }
    }
  }
  /**
   * The "recommended" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $recommended = $booksService->recommended;
   *  </code>
   */
  class Google_VolumesRecommendedServiceResource extends Google_ServiceResource {

    /**
     * Return a list of recommended books for the current user. (recommended.list)
     *
     * @param array $optParams Optional parameters.
     *
     * @opt_param string locale ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating ***REMOVED***.
     * @opt_param string source String to identify the originator of this request.
     * @return Google_Volumes
     */
    public function listVolumesRecommended($optParams = array()) {
      $params = array();
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Volumes($data);
      } else {
        return $data;
      }
    }
  }
  /**
   * The "useruploaded" collection of methods.
   * Typical usage is:
   *  <code>
   *   $booksService = new Google_BooksService(...);
   *   $useruploaded = $booksService->useruploaded;
   *  </code>
   */
  class Google_VolumesUseruploadedServiceResource extends Google_ServiceResource {

    /**
     * Return a list of books uploaded by the current user. (useruploaded.list)
     *
     * @param array $optParams Optional parameters.
     *
     * @opt_param string locale ISO-639-1 language and ISO-3166-1 country code. Ex: 'en_US'. Used for generating ***REMOVED***.
     * @opt_param string maxResults Maximum number of results to return.
     * @opt_param string ***REMOVED*** The processing state of the user uploaded volumes to be returned.
     * @opt_param string source String to identify the originator of this request.
     * @opt_param string startIndex Index of the first result to return (starts at 0)
     * @opt_param string volumeId The ids of the volumes to be returned. If not specified all that match the ***REMOVED*** are returned.
     * @return Google_Volumes
     */
    public function listVolumesUseruploaded($optParams = array()) {
      $params = array();
      $params = array_merge($params, $optParams);
      $data = $this->__call('list', array($params));
      if ($this->useObjects()) {
        return new Google_Volumes($data);
      } else {
        return $data;
      }
    }
  }

/**
 * Service definition for Google_Books (v1).
 *
 * <p>
 * Lets you search for books and manage your Google Books library.
 * </p>
 *
 * <p>
 * For more information about this service, see the
 * <a href="https://developers.google.com/books/docs/v1/getting_started" target="_blank">API Documentation</a>
 * </p>
 *
 * @author Google, Inc.
 */
class Google_BooksService extends Google_Service {
  public $bookshelves;
  public $bookshelves_volumes;
  public $cloudloading;
  public $layers;
  public $layers_annotationData;
  public $layers_volumeAnnotations;
  public $myconfig;
  public $mylibrary_annotations;
  public $mylibrary_bookshelves;
  public $mylibrary_bookshelves_volumes;
  public $mylibrary_readingpositions;
  public $volumes;
  public $volumes_associated;
  public $volumes_mybooks;
  public $volumes_recommended;
  public $volumes_useruploaded;
  /**
   * Constructs the internal ***REMOVED*** of the Books service.
   *
   * @param Google_Client $client
   */
  public function __construct(Google_Client $client) {
    $this->servicePath = 'books/v1/';
    $this->version = 'v1';
    $this->serviceName = 'books';

    $client->addService($this->serviceName, $this->version);
    $this->bookshelves = new Google_BookshelvesServiceResource($this, $this->serviceName, 'bookshelves', json_decode('{"methods": {"get": {"id": "books.bookshelves.get", "path": "users/{userId}/bookshelves/{shelf}", "httpMethod": "GET", "parameters": {"shelf": {"type": "string", "required": true, "location": "path"}, "source": {"type": "string", "location": "query"}, "userId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Bookshelf"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "list": {"id": "books.bookshelves.list", "path": "users/{userId}/bookshelves", "httpMethod": "GET", "parameters": {"source": {"type": "string", "location": "query"}, "userId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Bookshelves"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->bookshelves_volumes = new Google_BookshelvesVolumesServiceResource($this, $this->serviceName, 'volumes', json_decode('{"methods": {"list": {"id": "books.bookshelves.volumes.list", "path": "users/{userId}/bookshelves/{shelf}/volumes", "httpMethod": "GET", "parameters": {"maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "location": "query"}, "shelf": {"type": "string", "required": true, "location": "path"}, "showPreorders": {"type": "boolean", "location": "query"}, "source": {"type": "string", "location": "query"}, "startIndex": {"type": "integer", "format": "uint32", "minimum": "0", "location": "query"}, "userId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Volumes"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->cloudloading = new Google_CloudloadingServiceResource($this, $this->serviceName, 'cloudloading', json_decode('{"methods": {"addBook": {"id": "books.cloudloading.addBook", "path": "cloudloading/addBook", "httpMethod": "POST", "parameters": {"drive_document_id": {"type": "string", "location": "query"}, "mime_type": {"type": "string", "location": "query"}, "name": {"type": "string", "location": "query"}, "upload_client_token": {"type": "string", "location": "query"}}, "response": {"$ref": "BooksCloudloadingResource"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "deleteBook": {"id": "books.cloudloading.deleteBook", "path": "cloudloading/deleteBook", "httpMethod": "POST", "parameters": {"volumeId": {"type": "string", "required": true, "location": "query"}}, "scopes": ["https://www.googleapis.com/auth/books"]}, "updateBook": {"id": "books.cloudloading.updateBook", "path": "cloudloading/updateBook", "httpMethod": "POST", "request": {"$ref": "BooksCloudloadingResource"}, "response": {"$ref": "BooksCloudloadingResource"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->layers = new Google_LayersServiceResource($this, $this->serviceName, 'layers', json_decode('{"methods": {"get": {"id": "books.layers.get", "path": "volumes/{volumeId}/layersummary/{summaryId}", "httpMethod": "GET", "parameters": {"***REMOVED***": {"type": "string", "location": "query"}, "source": {"type": "string", "location": "query"}, "summaryId": {"type": "string", "required": true, "location": "path"}, "volumeId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Layersummary"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "list": {"id": "books.layers.list", "path": "volumes/{volumeId}/layersummary", "httpMethod": "GET", "parameters": {"***REMOVED***": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "maximum": "200", "location": "query"}, "pageToken": {"type": "string", "location": "query"}, "source": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "***REMOVED***"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->layers_annotationData = new Google_LayersAnnotationDataServiceResource($this, $this->serviceName, '***REMOVED***', json_decode('{"methods": {"get": {"id": "books.layers.***REMOVED***.get", "path": "volumes/{volumeId}/layers/{layerId}/data/{***REMOVED***}", "httpMethod": "GET", "parameters": {"***REMOVED***": {"type": "string", "required": true, "location": "path"}, "***REMOVED***": {"type": "string", "required": true, "location": "query"}, "h": {"type": "integer", "format": "int32", "location": "query"}, "layerId": {"type": "string", "required": true, "location": "path"}, "locale": {"type": "string", "location": "query"}, "scale": {"type": "integer", "format": "int32", "minimum": "0", "location": "query"}, "source": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "path"}, "w": {"type": "integer", "format": "int32", "location": "query"}}, "response": {"$ref": "***REMOVED***"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "list": {"id": "books.layers.***REMOVED***.list", "path": "volumes/{volumeId}/layers/{layerId}/data", "httpMethod": "GET", "parameters": {"***REMOVED***": {"type": "string", "repeated": true, "location": "query"}, "***REMOVED***": {"type": "string", "required": true, "location": "query"}, "h": {"type": "integer", "format": "int32", "location": "query"}, "layerId": {"type": "string", "required": true, "location": "path"}, "locale": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "maximum": "200", "location": "query"}, "pageToken": {"type": "string", "location": "query"}, "scale": {"type": "integer", "format": "int32", "minimum": "0", "location": "query"}, "source": {"type": "string", "location": "query"}, "updatedMax": {"type": "string", "location": "query"}, "updatedMin": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "path"}, "w": {"type": "integer", "format": "int32", "location": "query"}}, "response": {"$ref": "***REMOVED***"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->layers_volumeAnnotations = new Google_LayersVolumeAnnotationsServiceResource($this, $this->serviceName, '***REMOVED***', json_decode('{"methods": {"get": {"id": "books.layers.***REMOVED***.get", "path": "volumes/{volumeId}/layers/{layerId}/annotations/{annotationId}", "httpMethod": "GET", "parameters": {"annotationId": {"type": "string", "required": true, "location": "path"}, "layerId": {"type": "string", "required": true, "location": "path"}, "locale": {"type": "string", "location": "query"}, "source": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "***REMOVED***"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "list": {"id": "books.layers.***REMOVED***.list", "path": "volumes/{volumeId}/layers/{layerId}", "httpMethod": "GET", "parameters": {"***REMOVED***": {"type": "string", "required": true, "location": "query"}, "endOffset": {"type": "string", "location": "query"}, "endPosition": {"type": "string", "location": "query"}, "layerId": {"type": "string", "required": true, "location": "path"}, "locale": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "maximum": "200", "location": "query"}, "pageToken": {"type": "string", "location": "query"}, "showDeleted": {"type": "boolean", "location": "query"}, "source": {"type": "string", "location": "query"}, "startOffset": {"type": "string", "location": "query"}, "startPosition": {"type": "string", "location": "query"}, "updatedMax": {"type": "string", "location": "query"}, "updatedMin": {"type": "string", "location": "query"}, "volumeAnnotationsVersion": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "***REMOVED***"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->myconfig = new Google_MyconfigServiceResource($this, $this->serviceName, 'myconfig', json_decode('{"methods": {"releaseDownloadAccess": {"id": "books.myconfig.releaseDownloadAccess", "path": "myconfig/releaseDownloadAccess", "httpMethod": "POST", "parameters": {"cpksver": {"type": "string", "required": true, "location": "query"}, "locale": {"type": "string", "location": "query"}, "source": {"type": "string", "location": "query"}, "volumeIds": {"type": "string", "required": true, "repeated": true, "location": "query"}}, "response": {"$ref": "***REMOVED***"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "requestAccess": {"id": "books.myconfig.requestAccess", "path": "myconfig/requestAccess", "httpMethod": "POST", "parameters": {"cpksver": {"type": "string", "required": true, "location": "query"}, "locale": {"type": "string", "location": "query"}, "nonce": {"type": "string", "required": true, "location": "query"}, "source": {"type": "string", "required": true, "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "query"}}, "response": {"$ref": "RequestAccess"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "***REMOVED***": {"id": "books.myconfig.***REMOVED***", "path": "myconfig/***REMOVED***", "httpMethod": "POST", "parameters": {"cpksver": {"type": "string", "required": true, "location": "query"}, "locale": {"type": "string", "location": "query"}, "nonce": {"type": "string", "required": true, "location": "query"}, "showPreorders": {"type": "boolean", "location": "query"}, "source": {"type": "string", "required": true, "location": "query"}, "volumeIds": {"type": "string", "repeated": true, "location": "query"}}, "response": {"$ref": "Volumes"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->mylibrary_annotations = new Google_MylibraryAnnotationsServiceResource($this, $this->serviceName, 'annotations', json_decode('{"methods": {"delete": {"id": "books.mylibrary.annotations.delete", "path": "mylibrary/annotations/{annotationId}", "httpMethod": "DELETE", "parameters": {"annotationId": {"type": "string", "required": true, "location": "path"}, "source": {"type": "string", "location": "query"}}, "scopes": ["https://www.googleapis.com/auth/books"]}, "get": {"id": "books.mylibrary.annotations.get", "path": "mylibrary/annotations/{annotationId}", "httpMethod": "GET", "parameters": {"annotationId": {"type": "string", "required": true, "location": "path"}, "source": {"type": "string", "location": "query"}}, "response": {"$ref": "Annotation"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "insert": {"id": "books.mylibrary.annotations.insert", "path": "mylibrary/annotations", "httpMethod": "POST", "parameters": {"source": {"type": "string", "location": "query"}}, "request": {"$ref": "Annotation"}, "response": {"$ref": "Annotation"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "list": {"id": "books.mylibrary.annotations.list", "path": "mylibrary/annotations", "httpMethod": "GET", "parameters": {"***REMOVED***": {"type": "string", "location": "query"}, "layerId": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "maximum": "40", "location": "query"}, "pageIds": {"type": "string", "repeated": true, "location": "query"}, "pageToken": {"type": "string", "location": "query"}, "showDeleted": {"type": "boolean", "location": "query"}, "source": {"type": "string", "location": "query"}, "updatedMax": {"type": "string", "location": "query"}, "updatedMin": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "location": "query"}}, "response": {"$ref": "Annotations"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "update": {"id": "books.mylibrary.annotations.update", "path": "mylibrary/annotations/{annotationId}", "httpMethod": "PUT", "parameters": {"annotationId": {"type": "string", "required": true, "location": "path"}, "source": {"type": "string", "location": "query"}}, "request": {"$ref": "Annotation"}, "response": {"$ref": "Annotation"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->mylibrary_bookshelves = new Google_MylibraryBookshelvesServiceResource($this, $this->serviceName, 'bookshelves', json_decode('{"methods": {"addVolume": {"id": "books.mylibrary.bookshelves.addVolume", "path": "mylibrary/bookshelves/{shelf}/addVolume", "httpMethod": "POST", "parameters": {"shelf": {"type": "string", "required": true, "location": "path"}, "source": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "query"}}, "scopes": ["https://www.googleapis.com/auth/books"]}, "clearVolumes": {"id": "books.mylibrary.bookshelves.clearVolumes", "path": "mylibrary/bookshelves/{shelf}/clearVolumes", "httpMethod": "POST", "parameters": {"shelf": {"type": "string", "required": true, "location": "path"}, "source": {"type": "string", "location": "query"}}, "scopes": ["https://www.googleapis.com/auth/books"]}, "get": {"id": "books.mylibrary.bookshelves.get", "path": "mylibrary/bookshelves/{shelf}", "httpMethod": "GET", "parameters": {"shelf": {"type": "string", "required": true, "location": "path"}, "source": {"type": "string", "location": "query"}}, "response": {"$ref": "Bookshelf"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "list": {"id": "books.mylibrary.bookshelves.list", "path": "mylibrary/bookshelves", "httpMethod": "GET", "parameters": {"source": {"type": "string", "location": "query"}}, "response": {"$ref": "Bookshelves"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "moveVolume": {"id": "books.mylibrary.bookshelves.moveVolume", "path": "mylibrary/bookshelves/{shelf}/moveVolume", "httpMethod": "POST", "parameters": {"shelf": {"type": "string", "required": true, "location": "path"}, "source": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "query"}, "***REMOVED***": {"type": "integer", "required": true, "format": "int32", "location": "query"}}, "scopes": ["https://www.googleapis.com/auth/books"]}, "removeVolume": {"id": "books.mylibrary.bookshelves.removeVolume", "path": "mylibrary/bookshelves/{shelf}/removeVolume", "httpMethod": "POST", "parameters": {"shelf": {"type": "string", "required": true, "location": "path"}, "source": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "query"}}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->mylibrary_bookshelves_volumes = new Google_MylibraryBookshelvesVolumesServiceResource($this, $this->serviceName, 'volumes', json_decode('{"methods": {"list": {"id": "books.mylibrary.bookshelves.volumes.list", "path": "mylibrary/bookshelves/{shelf}/volumes", "httpMethod": "GET", "parameters": {"country": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "location": "query"}, "projection": {"type": "string", "enum": ["full", "lite"], "location": "query"}, "q": {"type": "string", "location": "query"}, "shelf": {"type": "string", "required": true, "location": "path"}, "showPreorders": {"type": "boolean", "location": "query"}, "source": {"type": "string", "location": "query"}, "startIndex": {"type": "integer", "format": "uint32", "minimum": "0", "location": "query"}}, "response": {"$ref": "Volumes"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->mylibrary_readingpositions = new Google_MylibraryReadingpositionsServiceResource($this, $this->serviceName, '***REMOVED***', json_decode('{"methods": {"get": {"id": "books.mylibrary.***REMOVED***.get", "path": "mylibrary/***REMOVED***/{volumeId}", "httpMethod": "GET", "parameters": {"***REMOVED***": {"type": "string", "location": "query"}, "source": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "***REMOVED***"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "setPosition": {"id": "books.mylibrary.***REMOVED***.setPosition", "path": "mylibrary/***REMOVED***/{volumeId}/setPosition", "httpMethod": "POST", "parameters": {"action": {"type": "string", "enum": ["bookmark", "chapter", "next-page", "prev-page", "scroll", "search"], "location": "query"}, "***REMOVED***": {"type": "string", "location": "query"}, "deviceCookie": {"type": "string", "location": "query"}, "position": {"type": "string", "required": true, "location": "query"}, "source": {"type": "string", "location": "query"}, "timestamp": {"type": "string", "required": true, "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "path"}}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->volumes = new Google_VolumesServiceResource($this, $this->serviceName, 'volumes', json_decode('{"methods": {"get": {"id": "books.volumes.get", "path": "volumes/{volumeId}", "httpMethod": "GET", "parameters": {"country": {"type": "string", "location": "query"}, "partner": {"type": "string", "location": "query"}, "projection": {"type": "string", "enum": ["full", "lite"], "location": "query"}, "source": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Volume"}, "scopes": ["https://www.googleapis.com/auth/books"]}, "list": {"id": "books.volumes.list", "path": "volumes", "httpMethod": "GET", "parameters": {"download": {"type": "string", "enum": ["epub"], "location": "query"}, "filter": {"type": "string", "enum": ["ebooks", "free-ebooks", "full", "paid-ebooks", "partial"], "location": "query"}, "langRestrict": {"type": "string", "location": "query"}, "***REMOVED***": {"type": "string", "enum": ["my-library", "no-restrict"], "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "maximum": "40", "location": "query"}, "orderBy": {"type": "string", "enum": ["newest", "relevance"], "location": "query"}, "partner": {"type": "string", "location": "query"}, "printType": {"type": "string", "enum": ["all", "books", "magazines"], "location": "query"}, "projection": {"type": "string", "enum": ["full", "lite"], "location": "query"}, "q": {"type": "string", "required": true, "location": "query"}, "showPreorders": {"type": "boolean", "location": "query"}, "source": {"type": "string", "location": "query"}, "startIndex": {"type": "integer", "format": "uint32", "minimum": "0", "location": "query"}}, "response": {"$ref": "Volumes"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->volumes_associated = new Google_VolumesAssociatedServiceResource($this, $this->serviceName, 'associated', json_decode('{"methods": {"list": {"id": "books.volumes.associated.list", "path": "volumes/{volumeId}/associated", "httpMethod": "GET", "parameters": {"association": {"type": "string", "enum": ["end-of-sample", "end-of-volume"], "location": "query"}, "locale": {"type": "string", "location": "query"}, "source": {"type": "string", "location": "query"}, "volumeId": {"type": "string", "required": true, "location": "path"}}, "response": {"$ref": "Volumes"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->volumes_mybooks = new Google_VolumesMybooksServiceResource($this, $this->serviceName, 'mybooks', json_decode('{"methods": {"list": {"id": "books.volumes.mybooks.list", "path": "volumes/mybooks", "httpMethod": "GET", "parameters": {"acquireMethod": {"type": "string", "enum": ["PREORDERED", "PUBLIC_DOMAIN", "PURCHASED", "SAMPLE", "UPLOADED"], "repeated": true, "location": "query"}, "locale": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "maximum": "100", "location": "query"}, "***REMOVED***": {"type": "string", "enum": ["COMPLETED_FAILED", "COMPLETED_SUCCESS", "RUNNING"], "repeated": true, "location": "query"}, "source": {"type": "string", "location": "query"}, "startIndex": {"type": "integer", "format": "uint32", "minimum": "0", "location": "query"}}, "response": {"$ref": "Volumes"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->volumes_recommended = new Google_VolumesRecommendedServiceResource($this, $this->serviceName, 'recommended', json_decode('{"methods": {"list": {"id": "books.volumes.recommended.list", "path": "volumes/recommended", "httpMethod": "GET", "parameters": {"locale": {"type": "string", "location": "query"}, "source": {"type": "string", "location": "query"}}, "response": {"$ref": "Volumes"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));
    $this->volumes_useruploaded = new Google_VolumesUseruploadedServiceResource($this, $this->serviceName, 'useruploaded', json_decode('{"methods": {"list": {"id": "books.volumes.useruploaded.list", "path": "volumes/useruploaded", "httpMethod": "GET", "parameters": {"locale": {"type": "string", "location": "query"}, "maxResults": {"type": "integer", "format": "uint32", "minimum": "0", "maximum": "40", "location": "query"}, "***REMOVED***": {"type": "string", "enum": ["COMPLETED_FAILED", "COMPLETED_SUCCESS", "RUNNING"], "repeated": true, "location": "query"}, "source": {"type": "string", "location": "query"}, "startIndex": {"type": "integer", "format": "uint32", "minimum": "0", "location": "query"}, "volumeId": {"type": "string", "repeated": true, "location": "query"}}, "response": {"$ref": "Volumes"}, "scopes": ["https://www.googleapis.com/auth/books"]}}}', true));

  }
}



class Google_Annotation extends Google_Model {
  public $***REMOVED***;
  public $***REMOVED***;
  protected $__clientVersionRangesType = 'Google_AnnotationClientVersionRanges';
  protected $__clientVersionRangesDataType = '';
  public $***REMOVED***;
  public $created;
  protected $__currentVersionRangesType = 'Google_AnnotationCurrentVersionRanges';
  protected $__currentVersionRangesDataType = '';
  public $***REMOVED***;
  public $data;
  public $deleted;
  public $***REMOVED***;
  public $id;
  public $kind;
  public $layerId;
  public $pageIds;
  public $selectedText;
  public $selfLink;
  public $updated;
  public $volumeId;
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setBeforeSelectedText( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getBeforeSelectedText() {
    return $this->***REMOVED***;
  }
  public function setClientVersionRanges(Google_AnnotationClientVersionRanges $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getClientVersionRanges() {
    return $this->***REMOVED***;
  }
  public function setCreated( $created) {
    $this->created = $created;
  }
  public function getCreated() {
    return $this->created;
  }
  public function setCurrentVersionRanges(Google_AnnotationCurrentVersionRanges $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getCurrentVersionRanges() {
    return $this->***REMOVED***;
  }
  public function setData( $data) {
    $this->data = $data;
  }
  public function getData() {
    return $this->data;
  }
  public function setDeleted( $deleted) {
    $this->deleted = $deleted;
  }
  public function getDeleted() {
    return $this->deleted;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setId( $id) {
    $this->id = $id;
  }
  public function getId() {
    return $this->id;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setLayerId( $layerId) {
    $this->layerId = $layerId;
  }
  public function getLayerId() {
    return $this->layerId;
  }
  public function setPageIds(/* array(Google_string) */ $pageIds) {
    $this->assertIsArray($pageIds, 'Google_string', __METHOD__);
    $this->pageIds = $pageIds;
  }
  public function getPageIds() {
    return $this->pageIds;
  }
  public function ***REMOVED***( $selectedText) {
    $this->selectedText = $selectedText;
  }
  public function ***REMOVED***() {
    return $this->selectedText;
  }
  public function setSelfLink( $selfLink) {
    $this->selfLink = $selfLink;
  }
  public function getSelfLink() {
    return $this->selfLink;
  }
  public function setUpdated( $updated) {
    $this->updated = $updated;
  }
  public function getUpdated() {
    return $this->updated;
  }
  public function setVolumeId( $volumeId) {
    $this->volumeId = $volumeId;
  }
  public function getVolumeId() {
    return $this->volumeId;
  }
}

class Google_AnnotationClientVersionRanges extends Google_Model {
  protected $__cfiRangeType = 'Google_BooksAnnotationsRange';
  protected $__cfiRangeDataType = '';
  public $cfiRange;
  public $***REMOVED***;
  protected $__gbImageRangeType = 'Google_BooksAnnotationsRange';
  protected $__gbImageRangeDataType = '';
  public $gbImageRange;
  protected $__gbTextRangeType = 'Google_BooksAnnotationsRange';
  protected $__gbTextRangeDataType = '';
  public $gbTextRange;
  protected $__imageCfiRangeType = 'Google_BooksAnnotationsRange';
  protected $__imageCfiRangeDataType = '';
  public $imageCfiRange;
  public function setCfiRange(Google_BooksAnnotationsRange $cfiRange) {
    $this->cfiRange = $cfiRange;
  }
  public function getCfiRange() {
    return $this->cfiRange;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(Google_BooksAnnotationsRange $gbImageRange) {
    $this->gbImageRange = $gbImageRange;
  }
  public function ***REMOVED***() {
    return $this->gbImageRange;
  }
  public function ***REMOVED***(Google_BooksAnnotationsRange $gbTextRange) {
    $this->gbTextRange = $gbTextRange;
  }
  public function ***REMOVED***() {
    return $this->gbTextRange;
  }
  public function ***REMOVED***(Google_BooksAnnotationsRange $imageCfiRange) {
    $this->imageCfiRange = $imageCfiRange;
  }
  public function ***REMOVED***() {
    return $this->imageCfiRange;
  }
}

class Google_AnnotationCurrentVersionRanges extends Google_Model {
  protected $__cfiRangeType = 'Google_BooksAnnotationsRange';
  protected $__cfiRangeDataType = '';
  public $cfiRange;
  public $***REMOVED***;
  protected $__gbImageRangeType = 'Google_BooksAnnotationsRange';
  protected $__gbImageRangeDataType = '';
  public $gbImageRange;
  protected $__gbTextRangeType = 'Google_BooksAnnotationsRange';
  protected $__gbTextRangeDataType = '';
  public $gbTextRange;
  protected $__imageCfiRangeType = 'Google_BooksAnnotationsRange';
  protected $__imageCfiRangeDataType = '';
  public $imageCfiRange;
  public function setCfiRange(Google_BooksAnnotationsRange $cfiRange) {
    $this->cfiRange = $cfiRange;
  }
  public function getCfiRange() {
    return $this->cfiRange;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(Google_BooksAnnotationsRange $gbImageRange) {
    $this->gbImageRange = $gbImageRange;
  }
  public function ***REMOVED***() {
    return $this->gbImageRange;
  }
  public function ***REMOVED***(Google_BooksAnnotationsRange $gbTextRange) {
    $this->gbTextRange = $gbTextRange;
  }
  public function ***REMOVED***() {
    return $this->gbTextRange;
  }
  public function ***REMOVED***(Google_BooksAnnotationsRange $imageCfiRange) {
    $this->imageCfiRange = $imageCfiRange;
  }
  public function ***REMOVED***() {
    return $this->imageCfiRange;
  }
}

class Google_Annotationdata extends Google_Model {
  public $***REMOVED***;
  public $data;
  public $encoded_data;
  public $id;
  public $kind;
  public $layerId;
  public $selfLink;
  public $updated;
  public $volumeId;
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setData( $data) {
    $this->data = $data;
  }
  public function getData() {
    return $this->data;
  }
  public function setEncoded_data( $encoded_data) {
    $this->encoded_data = $encoded_data;
  }
  public function getEncoded_data() {
    return $this->encoded_data;
  }
  public function setId( $id) {
    $this->id = $id;
  }
  public function getId() {
    return $this->id;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setLayerId( $layerId) {
    $this->layerId = $layerId;
  }
  public function getLayerId() {
    return $this->layerId;
  }
  public function setSelfLink( $selfLink) {
    $this->selfLink = $selfLink;
  }
  public function getSelfLink() {
    return $this->selfLink;
  }
  public function setUpdated( $updated) {
    $this->updated = $updated;
  }
  public function getUpdated() {
    return $this->updated;
  }
  public function setVolumeId( $volumeId) {
    $this->volumeId = $volumeId;
  }
  public function getVolumeId() {
    return $this->volumeId;
  }
}

class Google_Annotations extends Google_Model {
  protected $__itemsType = 'Google_Annotation';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public $nextPageToken;
  public $totalItems;
  public function setItems(/* array(Google_Annotation) */ $items) {
    $this->assertIsArray($items, 'Google_Annotation', __METHOD__);
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
  public function setTotalItems( $totalItems) {
    $this->totalItems = $totalItems;
  }
  public function getTotalItems() {
    return $this->totalItems;
  }
}

class Google_Annotationsdata extends Google_Model {
  protected $__itemsType = 'Google_Annotationdata';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public $nextPageToken;
  public $totalItems;
  public function setItems(/* array(Google_Annotationdata) */ $items) {
    $this->assertIsArray($items, 'Google_Annotationdata', __METHOD__);
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
  public function setTotalItems( $totalItems) {
    $this->totalItems = $totalItems;
  }
  public function getTotalItems() {
    return $this->totalItems;
  }
}

class Google_BooksAnnotationsRange extends Google_Model {
  public $endOffset;
  public $endPosition;
  public $startOffset;
  public $startPosition;
  public function setEndOffset( $endOffset) {
    $this->endOffset = $endOffset;
  }
  public function getEndOffset() {
    return $this->endOffset;
  }
  public function ***REMOVED***( $endPosition) {
    $this->endPosition = $endPosition;
  }
  public function ***REMOVED***() {
    return $this->endPosition;
  }
  public function ***REMOVED***( $startOffset) {
    $this->startOffset = $startOffset;
  }
  public function ***REMOVED***() {
    return $this->startOffset;
  }
  public function ***REMOVED***( $startPosition) {
    $this->startPosition = $startPosition;
  }
  public function ***REMOVED***() {
    return $this->startPosition;
  }
}

class Google_BooksCloudloadingResource extends Google_Model {
  public $author;
  public $***REMOVED***;
  public $title;
  public $volumeId;
  public function setAuthor( $author) {
    $this->author = $author;
  }
  public function getAuthor() {
    return $this->author;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setTitle( $title) {
    $this->title = $title;
  }
  public function getTitle() {
    return $this->title;
  }
  public function setVolumeId( $volumeId) {
    $this->volumeId = $volumeId;
  }
  public function getVolumeId() {
    return $this->volumeId;
  }
}

class Google_BooksLayerDictData extends Google_Model {
  protected $__commonType = 'Google_BooksLayerDictDataCommon';
  protected $__commonDataType = '';
  public $common;
  protected $__dictType = 'Google_BooksLayerDictDataDict';
  protected $__dictDataType = '';
  public $dict;
  public function setCommon(Google_BooksLayerDictDataCommon $common) {
    $this->common = $common;
  }
  public function getCommon() {
    return $this->common;
  }
  public function setDict(Google_BooksLayerDictDataDict $dict) {
    $this->dict = $dict;
  }
  public function getDict() {
    return $this->dict;
  }
}

class Google_BooksLayerDictDataCommon extends Google_Model {
  public $title;
  public function setTitle( $title) {
    $this->title = $title;
  }
  public function getTitle() {
    return $this->title;
  }
}

class Google_BooksLayerDictDataDict extends Google_Model {
  protected $__sourceType = 'Google_BooksLayerDictDataDictSource';
  protected $__sourceDataType = '';
  public $source;
  protected $__wordsType = 'Google_BooksLayerDictDataDictWords';
  protected $__wordsDataType = 'array';
  public $words;
  public function setSource(Google_BooksLayerDictDataDictSource $source) {
    $this->source = $source;
  }
  public function getSource() {
    return $this->source;
  }
  public function setWords(/* array(Google_BooksLayerDictDataDictWords) */ $words) {
    $this->assertIsArray($words, 'Google_BooksLayerDictDataDictWords', __METHOD__);
    $this->words = $words;
  }
  public function getWords() {
    return $this->words;
  }
}

class Google_BooksLayerDictDataDictSource extends Google_Model {
  public $attribution;
  public $url;
  public function ***REMOVED***( $attribution) {
    $this->attribution = $attribution;
  }
  public function ***REMOVED***() {
    return $this->attribution;
  }
  public function setUrl( $url) {
    $this->url = $url;
  }
  public function getUrl() {
    return $this->url;
  }
}

class Google_BooksLayerDictDataDictWords extends Google_Model {
  protected $__derivativesType = 'Google_BooksLayerDictDataDictWordsDerivatives';
  protected $__derivativesDataType = 'array';
  public $derivatives;
  protected $__examplesType = 'Google_BooksLayerDictDataDictWordsExamples';
  protected $__examplesDataType = 'array';
  public $examples;
  protected $__sensesType = 'Google_BooksLayerDictDataDictWordsSenses';
  protected $__sensesDataType = 'array';
  public $senses;
  protected $__sourceType = 'Google_BooksLayerDictDataDictWordsSource';
  protected $__sourceDataType = '';
  public $source;
  public function ***REMOVED***(/* array(Google_BooksLayerDictDataDictWordsDerivatives) */ $derivatives) {
    $this->assertIsArray($derivatives, 'Google_BooksLayerDictDataDictWordsDerivatives', __METHOD__);
    $this->derivatives = $derivatives;
  }
  public function ***REMOVED***() {
    return $this->derivatives;
  }
  public function setExamples(/* array(Google_BooksLayerDictDataDictWordsExamples) */ $examples) {
    $this->assertIsArray($examples, 'Google_BooksLayerDictDataDictWordsExamples', __METHOD__);
    $this->examples = $examples;
  }
  public function getExamples() {
    return $this->examples;
  }
  public function setSenses(/* array(Google_BooksLayerDictDataDictWordsSenses) */ $senses) {
    $this->assertIsArray($senses, 'Google_BooksLayerDictDataDictWordsSenses', __METHOD__);
    $this->senses = $senses;
  }
  public function getSenses() {
    return $this->senses;
  }
  public function setSource(Google_BooksLayerDictDataDictWordsSource $source) {
    $this->source = $source;
  }
  public function getSource() {
    return $this->source;
  }
}

class Google_BooksLayerDictDataDictWordsDerivatives extends Google_Model {
  protected $__sourceType = 'Google_BooksLayerDictDataDictWordsDerivativesSource';
  protected $__sourceDataType = '';
  public $source;
  public $text;
  public function setSource(Google_BooksLayerDictDataDictWordsDerivativesSource $source) {
    $this->source = $source;
  }
  public function getSource() {
    return $this->source;
  }
  public function setText( $text) {
    $this->text = $text;
  }
  public function getText() {
    return $this->text;
  }
}

class Google_BooksLayerDictDataDictWordsDerivativesSource extends Google_Model {
  public $attribution;
  public $url;
  public function ***REMOVED***( $attribution) {
    $this->attribution = $attribution;
  }
  public function ***REMOVED***() {
    return $this->attribution;
  }
  public function setUrl( $url) {
    $this->url = $url;
  }
  public function getUrl() {
    return $this->url;
  }
}

class Google_BooksLayerDictDataDictWordsExamples extends Google_Model {
  protected $__sourceType = 'Google_BooksLayerDictDataDictWordsExamplesSource';
  protected $__sourceDataType = '';
  public $source;
  public $text;
  public function setSource(Google_BooksLayerDictDataDictWordsExamplesSource $source) {
    $this->source = $source;
  }
  public function getSource() {
    return $this->source;
  }
  public function setText( $text) {
    $this->text = $text;
  }
  public function getText() {
    return $this->text;
  }
}

class Google_BooksLayerDictDataDictWordsExamplesSource extends Google_Model {
  public $attribution;
  public $url;
  public function ***REMOVED***( $attribution) {
    $this->attribution = $attribution;
  }
  public function ***REMOVED***() {
    return $this->attribution;
  }
  public function setUrl( $url) {
    $this->url = $url;
  }
  public function getUrl() {
    return $this->url;
  }
}

class Google_BooksLayerDictDataDictWordsSenses extends Google_Model {
  protected $__conjugationsType = 'Google_BooksLayerDictDataDictWordsSensesConjugations';
  protected $__conjugationsDataType = 'array';
  public $conjugations;
  protected $__definitionsType = 'Google_BooksLayerDictDataDictWordsSensesDefinitions';
  protected $__definitionsDataType = 'array';
  public $definitions;
  public $partOfSpeech;
  public $pronunciation;
  public $***REMOVED***;
  protected $__sourceType = 'Google_BooksLayerDictDataDictWordsSensesSource';
  protected $__sourceDataType = '';
  public $source;
  public $***REMOVED***;
  protected $__synonymsType = 'Google_BooksLayerDictDataDictWordsSensesSynonyms';
  protected $__synonymsDataType = 'array';
  public $synonyms;
  public function ***REMOVED***(/* array(Google_BooksLayerDictDataDictWordsSensesConjugations) */ $conjugations) {
    $this->assertIsArray($conjugations, 'Google_BooksLayerDictDataDictWordsSensesConjugations', __METHOD__);
    $this->conjugations = $conjugations;
  }
  public function ***REMOVED***() {
    return $this->conjugations;
  }
  public function ***REMOVED***(/* array(Google_BooksLayerDictDataDictWordsSensesDefinitions) */ $definitions) {
    $this->assertIsArray($definitions, 'Google_BooksLayerDictDataDictWordsSensesDefinitions', __METHOD__);
    $this->definitions = $definitions;
  }
  public function ***REMOVED***() {
    return $this->definitions;
  }
  public function ***REMOVED***( $partOfSpeech) {
    $this->partOfSpeech = $partOfSpeech;
  }
  public function ***REMOVED***() {
    return $this->partOfSpeech;
  }
  public function ***REMOVED***( $pronunciation) {
    $this->pronunciation = $pronunciation;
  }
  public function ***REMOVED***() {
    return $this->pronunciation;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setSource(Google_BooksLayerDictDataDictWordsSensesSource $source) {
    $this->source = $source;
  }
  public function getSource() {
    return $this->source;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setSynonyms(/* array(Google_BooksLayerDictDataDictWordsSensesSynonyms) */ $synonyms) {
    $this->assertIsArray($synonyms, 'Google_BooksLayerDictDataDictWordsSensesSynonyms', __METHOD__);
    $this->synonyms = $synonyms;
  }
  public function getSynonyms() {
    return $this->synonyms;
  }
}

class Google_BooksLayerDictDataDictWordsSensesConjugations extends Google_Model {
  public $type;
  public $value;
  public function setType( $type) {
    $this->type = $type;
  }
  public function getType() {
    return $this->type;
  }
  public function setValue( $value) {
    $this->value = $value;
  }
  public function getValue() {
    return $this->value;
  }
}

class Google_BooksLayerDictDataDictWordsSensesDefinitions extends Google_Model {
  public $definition;
  protected $__examplesType = 'Google_BooksLayerDictDataDictWordsSensesDefinitionsExamples';
  protected $__examplesDataType = 'array';
  public $examples;
  public function setDefinition( $definition) {
    $this->definition = $definition;
  }
  public function getDefinition() {
    return $this->definition;
  }
  public function setExamples(/* array(Google_BooksLayerDictDataDictWordsSensesDefinitionsExamples) */ $examples) {
    $this->assertIsArray($examples, 'Google_BooksLayerDictDataDictWordsSensesDefinitionsExamples', __METHOD__);
    $this->examples = $examples;
  }
  public function getExamples() {
    return $this->examples;
  }
}

class Google_BooksLayerDictDataDictWordsSensesDefinitionsExamples extends Google_Model {
  protected $__sourceType = 'Google_BooksLayerDictDataDictWordsSensesDefinitionsExamplesSource';
  protected $__sourceDataType = '';
  public $source;
  public $text;
  public function setSource(Google_BooksLayerDictDataDictWordsSensesDefinitionsExamplesSource $source) {
    $this->source = $source;
  }
  public function getSource() {
    return $this->source;
  }
  public function setText( $text) {
    $this->text = $text;
  }
  public function getText() {
    return $this->text;
  }
}

class Google_BooksLayerDictDataDictWordsSensesDefinitionsExamplesSource extends Google_Model {
  public $attribution;
  public $url;
  public function ***REMOVED***( $attribution) {
    $this->attribution = $attribution;
  }
  public function ***REMOVED***() {
    return $this->attribution;
  }
  public function setUrl( $url) {
    $this->url = $url;
  }
  public function getUrl() {
    return $this->url;
  }
}

class Google_BooksLayerDictDataDictWordsSensesSource extends Google_Model {
  public $attribution;
  public $url;
  public function ***REMOVED***( $attribution) {
    $this->attribution = $attribution;
  }
  public function ***REMOVED***() {
    return $this->attribution;
  }
  public function setUrl( $url) {
    $this->url = $url;
  }
  public function getUrl() {
    return $this->url;
  }
}

class Google_BooksLayerDictDataDictWordsSensesSynonyms extends Google_Model {
  protected $__sourceType = 'Google_BooksLayerDictDataDictWordsSensesSynonymsSource';
  protected $__sourceDataType = '';
  public $source;
  public $text;
  public function setSource(Google_BooksLayerDictDataDictWordsSensesSynonymsSource $source) {
    $this->source = $source;
  }
  public function getSource() {
    return $this->source;
  }
  public function setText( $text) {
    $this->text = $text;
  }
  public function getText() {
    return $this->text;
  }
}

class Google_BooksLayerDictDataDictWordsSensesSynonymsSource extends Google_Model {
  public $attribution;
  public $url;
  public function ***REMOVED***( $attribution) {
    $this->attribution = $attribution;
  }
  public function ***REMOVED***() {
    return $this->attribution;
  }
  public function setUrl( $url) {
    $this->url = $url;
  }
  public function getUrl() {
    return $this->url;
  }
}

class Google_BooksLayerDictDataDictWordsSource extends Google_Model {
  public $attribution;
  public $url;
  public function ***REMOVED***( $attribution) {
    $this->attribution = $attribution;
  }
  public function ***REMOVED***() {
    return $this->attribution;
  }
  public function setUrl( $url) {
    $this->url = $url;
  }
  public function getUrl() {
    return $this->url;
  }
}

class Google_BooksLayerGeoData extends Google_Model {
  protected $__commonType = 'Google_BooksLayerGeoDataCommon';
  protected $__commonDataType = '';
  public $common;
  protected $__geoType = 'Google_BooksLayerGeoDataGeo';
  protected $__geoDataType = '';
  public $geo;
  public function setCommon(Google_BooksLayerGeoDataCommon $common) {
    $this->common = $common;
  }
  public function getCommon() {
    return $this->common;
  }
  public function setGeo(Google_BooksLayerGeoDataGeo $geo) {
    $this->geo = $geo;
  }
  public function getGeo() {
    return $this->geo;
  }
}

class Google_BooksLayerGeoDataCommon extends Google_Model {
  public $lang;
  public $***REMOVED***;
  public $snippet;
  public $snippetUrl;
  public $title;
  public function setLang( $lang) {
    $this->lang = $lang;
  }
  public function getLang() {
    return $this->lang;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setSnippet( $snippet) {
    $this->snippet = $snippet;
  }
  public function getSnippet() {
    return $this->snippet;
  }
  public function setSnippetUrl( $snippetUrl) {
    $this->snippetUrl = $snippetUrl;
  }
  public function getSnippetUrl() {
    return $this->snippetUrl;
  }
  public function setTitle( $title) {
    $this->title = $title;
  }
  public function getTitle() {
    return $this->title;
  }
}

class Google_BooksLayerGeoDataGeo extends Google_Model {
  protected $__boundaryType = 'Google_BooksLayerGeoDataGeoBoundary';
  protected $__boundaryDataType = 'array';
  public $boundary;
  public $cachePolicy;
  public $countryCode;
  public $latitude;
  public $longitude;
  public $mapType;
  protected $__viewportType = 'Google_BooksLayerGeoDataGeoViewport';
  protected $__viewportDataType = '';
  public $viewport;
  public $zoom;
  public function setBoundary(/* array(Google_BooksLayerGeoDataGeoBoundary) */ $boundary) {
    $this->assertIsArray($boundary, 'Google_BooksLayerGeoDataGeoBoundary', __METHOD__);
    $this->boundary = $boundary;
  }
  public function getBoundary() {
    return $this->boundary;
  }
  public function ***REMOVED***( $cachePolicy) {
    $this->cachePolicy = $cachePolicy;
  }
  public function ***REMOVED***() {
    return $this->cachePolicy;
  }
  public function ***REMOVED***( $countryCode) {
    $this->countryCode = $countryCode;
  }
  public function ***REMOVED***() {
    return $this->countryCode;
  }
  public function setLatitude( $latitude) {
    $this->latitude = $latitude;
  }
  public function getLatitude() {
    return $this->latitude;
  }
  public function setLongitude( $longitude) {
    $this->longitude = $longitude;
  }
  public function getLongitude() {
    return $this->longitude;
  }
  public function setMapType( $mapType) {
    $this->mapType = $mapType;
  }
  public function getMapType() {
    return $this->mapType;
  }
  public function setViewport(Google_BooksLayerGeoDataGeoViewport $viewport) {
    $this->viewport = $viewport;
  }
  public function getViewport() {
    return $this->viewport;
  }
  public function setZoom( $zoom) {
    $this->zoom = $zoom;
  }
  public function getZoom() {
    return $this->zoom;
  }
}

class Google_BooksLayerGeoDataGeoBoundary extends Google_Model {
  public $latitude;
  public $longitude;
  public function setLatitude( $latitude) {
    $this->latitude = $latitude;
  }
  public function getLatitude() {
    return $this->latitude;
  }
  public function setLongitude( $longitude) {
    $this->longitude = $longitude;
  }
  public function getLongitude() {
    return $this->longitude;
  }
}

class Google_BooksLayerGeoDataGeoViewport extends Google_Model {
  protected $__hiType = 'Google_BooksLayerGeoDataGeoViewportHi';
  protected $__hiDataType = '';
  public $hi;
  protected $__loType = 'Google_BooksLayerGeoDataGeoViewportLo';
  protected $__loDataType = '';
  public $lo;
  public function setHi(Google_BooksLayerGeoDataGeoViewportHi $hi) {
    $this->hi = $hi;
  }
  public function getHi() {
    return $this->hi;
  }
  public function setLo(Google_BooksLayerGeoDataGeoViewportLo $lo) {
    $this->lo = $lo;
  }
  public function getLo() {
    return $this->lo;
  }
}

class Google_BooksLayerGeoDataGeoViewportHi extends Google_Model {
  public $latitude;
  public $longitude;
  public function setLatitude( $latitude) {
    $this->latitude = $latitude;
  }
  public function getLatitude() {
    return $this->latitude;
  }
  public function setLongitude( $longitude) {
    $this->longitude = $longitude;
  }
  public function getLongitude() {
    return $this->longitude;
  }
}

class Google_BooksLayerGeoDataGeoViewportLo extends Google_Model {
  public $latitude;
  public $longitude;
  public function setLatitude( $latitude) {
    $this->latitude = $latitude;
  }
  public function getLatitude() {
    return $this->latitude;
  }
  public function setLongitude( $longitude) {
    $this->longitude = $longitude;
  }
  public function getLongitude() {
    return $this->longitude;
  }
}

class Google_Bookshelf extends Google_Model {
  public $access;
  public $created;
  public $description;
  public $id;
  public $kind;
  public $selfLink;
  public $title;
  public $updated;
  public $volumeCount;
  public $***REMOVED***;
  public function setAccess( $access) {
    $this->access = $access;
  }
  public function getAccess() {
    return $this->access;
  }
  public function setCreated( $created) {
    $this->created = $created;
  }
  public function getCreated() {
    return $this->created;
  }
  public function ***REMOVED***( $description) {
    $this->description = $description;
  }
  public function ***REMOVED***() {
    return $this->description;
  }
  public function setId( $id) {
    $this->id = $id;
  }
  public function getId() {
    return $this->id;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setSelfLink( $selfLink) {
    $this->selfLink = $selfLink;
  }
  public function getSelfLink() {
    return $this->selfLink;
  }
  public function setTitle( $title) {
    $this->title = $title;
  }
  public function getTitle() {
    return $this->title;
  }
  public function setUpdated( $updated) {
    $this->updated = $updated;
  }
  public function getUpdated() {
    return $this->updated;
  }
  public function ***REMOVED***( $volumeCount) {
    $this->volumeCount = $volumeCount;
  }
  public function ***REMOVED***() {
    return $this->volumeCount;
  }
  public function setVolumesLastUpdated( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getVolumesLastUpdated() {
    return $this->***REMOVED***;
  }
}

class Google_Bookshelves extends Google_Model {
  protected $__itemsType = 'Google_Bookshelf';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public function setItems(/* array(Google_Bookshelf) */ $items) {
    $this->assertIsArray($items, 'Google_Bookshelf', __METHOD__);
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

class Google_ConcurrentAccessRestriction extends Google_Model {
  public $deviceAllowed;
  public $kind;
  public $***REMOVED***;
  public $message;
  public $nonce;
  public $reasonCode;
  public $restricted;
  public $signature;
  public $source;
  public $***REMOVED***;
  public $volumeId;
  public function ***REMOVED***( $deviceAllowed) {
    $this->deviceAllowed = $deviceAllowed;
  }
  public function ***REMOVED***() {
    return $this->deviceAllowed;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setMaxConcurrentDevices( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getMaxConcurrentDevices() {
    return $this->***REMOVED***;
  }
  public function setMessage( $message) {
    $this->message = $message;
  }
  public function getMessage() {
    return $this->message;
  }
  public function setNonce( $nonce) {
    $this->nonce = $nonce;
  }
  public function getNonce() {
    return $this->nonce;
  }
  public function setReasonCode( $reasonCode) {
    $this->reasonCode = $reasonCode;
  }
  public function getReasonCode() {
    return $this->reasonCode;
  }
  public function setRestricted( $restricted) {
    $this->restricted = $restricted;
  }
  public function getRestricted() {
    return $this->restricted;
  }
  public function setSignature( $signature) {
    $this->signature = $signature;
  }
  public function getSignature() {
    return $this->signature;
  }
  public function setSource( $source) {
    $this->source = $source;
  }
  public function getSource() {
    return $this->source;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setVolumeId( $volumeId) {
    $this->volumeId = $volumeId;
  }
  public function getVolumeId() {
    return $this->volumeId;
  }
}

class Google_DownloadAccessRestriction extends Google_Model {
  public $deviceAllowed;
  public $***REMOVED***;
  public $justAcquired;
  public $kind;
  public $***REMOVED***;
  public $message;
  public $nonce;
  public $reasonCode;
  public $restricted;
  public $signature;
  public $source;
  public $volumeId;
  public function ***REMOVED***( $deviceAllowed) {
    $this->deviceAllowed = $deviceAllowed;
  }
  public function ***REMOVED***() {
    return $this->deviceAllowed;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $justAcquired) {
    $this->justAcquired = $justAcquired;
  }
  public function ***REMOVED***() {
    return $this->justAcquired;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setMaxDownloadDevices( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getMaxDownloadDevices() {
    return $this->***REMOVED***;
  }
  public function setMessage( $message) {
    $this->message = $message;
  }
  public function getMessage() {
    return $this->message;
  }
  public function setNonce( $nonce) {
    $this->nonce = $nonce;
  }
  public function getNonce() {
    return $this->nonce;
  }
  public function setReasonCode( $reasonCode) {
    $this->reasonCode = $reasonCode;
  }
  public function getReasonCode() {
    return $this->reasonCode;
  }
  public function setRestricted( $restricted) {
    $this->restricted = $restricted;
  }
  public function getRestricted() {
    return $this->restricted;
  }
  public function setSignature( $signature) {
    $this->signature = $signature;
  }
  public function getSignature() {
    return $this->signature;
  }
  public function setSource( $source) {
    $this->source = $source;
  }
  public function getSource() {
    return $this->source;
  }
  public function setVolumeId( $volumeId) {
    $this->volumeId = $volumeId;
  }
  public function getVolumeId() {
    return $this->volumeId;
  }
}

class Google_DownloadAccesses extends Google_Model {
  protected $__downloadAccessListType = 'Google_DownloadAccessRestriction';
  protected $__downloadAccessListDataType = 'array';
  public $***REMOVED***;
  public $kind;
  public function setDownloadAccessList(/* array(Google_DownloadAccessRestriction) */ $***REMOVED***) {
    $this->assertIsArray($***REMOVED***, 'Google_DownloadAccessRestriction', __METHOD__);
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getDownloadAccessList() {
    return $this->***REMOVED***;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
}

class Google_Layersummaries extends Google_Model {
  protected $__itemsType = 'Google_Layersummary';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public $totalItems;
  public function setItems(/* array(Google_Layersummary) */ $items) {
    $this->assertIsArray($items, 'Google_Layersummary', __METHOD__);
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
  public function setTotalItems( $totalItems) {
    $this->totalItems = $totalItems;
  }
  public function getTotalItems() {
    return $this->totalItems;
  }
}

class Google_Layersummary extends Google_Model {
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $dataCount;
  public $id;
  public $kind;
  public $layerId;
  public $selfLink;
  public $updated;
  public $volumeAnnotationsVersion;
  public $volumeId;
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(/* array(Google_string) */ $***REMOVED***) {
    $this->assertIsArray($***REMOVED***, 'Google_string', __METHOD__);
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setAnnotationsDataLink( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getAnnotationsDataLink() {
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
  public function setDataCount( $dataCount) {
    $this->dataCount = $dataCount;
  }
  public function getDataCount() {
    return $this->dataCount;
  }
  public function setId( $id) {
    $this->id = $id;
  }
  public function getId() {
    return $this->id;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setLayerId( $layerId) {
    $this->layerId = $layerId;
  }
  public function getLayerId() {
    return $this->layerId;
  }
  public function setSelfLink( $selfLink) {
    $this->selfLink = $selfLink;
  }
  public function getSelfLink() {
    return $this->selfLink;
  }
  public function setUpdated( $updated) {
    $this->updated = $updated;
  }
  public function getUpdated() {
    return $this->updated;
  }
  public function setVolumeAnnotationsVersion( $volumeAnnotationsVersion) {
    $this->volumeAnnotationsVersion = $volumeAnnotationsVersion;
  }
  public function getVolumeAnnotationsVersion() {
    return $this->volumeAnnotationsVersion;
  }
  public function setVolumeId( $volumeId) {
    $this->volumeId = $volumeId;
  }
  public function getVolumeId() {
    return $this->volumeId;
  }
}

class Google_ReadingPosition extends Google_Model {
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  public $kind;
  public $pdfPosition;
  public $updated;
  public $volumeId;
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
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function ***REMOVED***( $pdfPosition) {
    $this->pdfPosition = $pdfPosition;
  }
  public function ***REMOVED***() {
    return $this->pdfPosition;
  }
  public function setUpdated( $updated) {
    $this->updated = $updated;
  }
  public function getUpdated() {
    return $this->updated;
  }
  public function setVolumeId( $volumeId) {
    $this->volumeId = $volumeId;
  }
  public function getVolumeId() {
    return $this->volumeId;
  }
}

class Google_RequestAccess extends Google_Model {
  protected $__concurrentAccessType = 'Google_ConcurrentAccessRestriction';
  protected $__concurrentAccessDataType = '';
  public $***REMOVED***;
  protected $__downloadAccessType = 'Google_DownloadAccessRestriction';
  protected $__downloadAccessDataType = '';
  public $***REMOVED***;
  public $kind;
  public function ***REMOVED***(Google_ConcurrentAccessRestriction $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(Google_DownloadAccessRestriction $***REMOVED***) {
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
}

class Google_Review extends Google_Model {
  protected $__authorType = 'Google_ReviewAuthor';
  protected $__authorDataType = '';
  public $author;
  public $content;
  public $date;
  public $fullTextUrl;
  public $kind;
  public $rating;
  protected $__sourceType = 'Google_ReviewSource';
  protected $__sourceDataType = '';
  public $source;
  public $title;
  public $type;
  public $volumeId;
  public function setAuthor(Google_ReviewAuthor $author) {
    $this->author = $author;
  }
  public function getAuthor() {
    return $this->author;
  }
  public function setContent( $content) {
    $this->content = $content;
  }
  public function getContent() {
    return $this->content;
  }
  public function setDate( $date) {
    $this->date = $date;
  }
  public function getDate() {
    return $this->date;
  }
  public function ***REMOVED***( $fullTextUrl) {
    $this->fullTextUrl = $fullTextUrl;
  }
  public function ***REMOVED***() {
    return $this->fullTextUrl;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setRating( $rating) {
    $this->rating = $rating;
  }
  public function getRating() {
    return $this->rating;
  }
  public function setSource(Google_ReviewSource $source) {
    $this->source = $source;
  }
  public function getSource() {
    return $this->source;
  }
  public function setTitle( $title) {
    $this->title = $title;
  }
  public function getTitle() {
    return $this->title;
  }
  public function setType( $type) {
    $this->type = $type;
  }
  public function getType() {
    return $this->type;
  }
  public function setVolumeId( $volumeId) {
    $this->volumeId = $volumeId;
  }
  public function getVolumeId() {
    return $this->volumeId;
  }
}

class Google_ReviewAuthor extends Google_Model {
  public $displayName;
  public function ***REMOVED***( $displayName) {
    $this->displayName = $displayName;
  }
  public function ***REMOVED***() {
    return $this->displayName;
  }
}

class Google_ReviewSource extends Google_Model {
  public $description;
  public $***REMOVED***;
  public $url;
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
  public function setUrl( $url) {
    $this->url = $url;
  }
  public function getUrl() {
    return $this->url;
  }
}

class Google_Volume extends Google_Model {
  protected $__accessInfoType = 'Google_VolumeAccessInfo';
  protected $__accessInfoDataType = '';
  public $accessInfo;
  public $etag;
  public $id;
  public $kind;
  protected $__layerInfoType = 'Google_VolumeLayerInfo';
  protected $__layerInfoDataType = '';
  public $layerInfo;
  protected $__recommendedInfoType = 'Google_VolumeRecommendedInfo';
  protected $__recommendedInfoDataType = '';
  public $***REMOVED***;
  protected $__saleInfoType = 'Google_VolumeSaleInfo';
  protected $__saleInfoDataType = '';
  public $saleInfo;
  protected $__searchInfoType = 'Google_VolumeSearchInfo';
  protected $__searchInfoDataType = '';
  public $searchInfo;
  public $selfLink;
  protected $__userInfoType = 'Google_VolumeUserInfo';
  protected $__userInfoDataType = '';
  public $userInfo;
  protected $__volumeInfoType = 'Google_VolumeVolumeInfo';
  protected $__volumeInfoDataType = '';
  public $volumeInfo;
  public function setAccessInfo(Google_VolumeAccessInfo $accessInfo) {
    $this->accessInfo = $accessInfo;
  }
  public function getAccessInfo() {
    return $this->accessInfo;
  }
  public function setEtag( $etag) {
    $this->etag = $etag;
  }
  public function getEtag() {
    return $this->etag;
  }
  public function setId( $id) {
    $this->id = $id;
  }
  public function getId() {
    return $this->id;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setLayerInfo(Google_VolumeLayerInfo $layerInfo) {
    $this->layerInfo = $layerInfo;
  }
  public function getLayerInfo() {
    return $this->layerInfo;
  }
  public function ***REMOVED***(Google_VolumeRecommendedInfo $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setSaleInfo(Google_VolumeSaleInfo $saleInfo) {
    $this->saleInfo = $saleInfo;
  }
  public function getSaleInfo() {
    return $this->saleInfo;
  }
  public function setSearchInfo(Google_VolumeSearchInfo $searchInfo) {
    $this->searchInfo = $searchInfo;
  }
  public function getSearchInfo() {
    return $this->searchInfo;
  }
  public function setSelfLink( $selfLink) {
    $this->selfLink = $selfLink;
  }
  public function getSelfLink() {
    return $this->selfLink;
  }
  public function setUserInfo(Google_VolumeUserInfo $userInfo) {
    $this->userInfo = $userInfo;
  }
  public function getUserInfo() {
    return $this->userInfo;
  }
  public function setVolumeInfo(Google_VolumeVolumeInfo $volumeInfo) {
    $this->volumeInfo = $volumeInfo;
  }
  public function getVolumeInfo() {
    return $this->volumeInfo;
  }
}

class Google_VolumeAccessInfo extends Google_Model {
  public $***REMOVED***;
  public $country;
  protected $__downloadAccessType = 'Google_DownloadAccessRestriction';
  protected $__downloadAccessDataType = '';
  public $***REMOVED***;
  public $embeddable;
  protected $__epubType = 'Google_VolumeAccessInfoEpub';
  protected $__epubDataType = '';
  public $epub;
  protected $__pdfType = 'Google_VolumeAccessInfoPdf';
  protected $__pdfDataType = '';
  public $pdf;
  public $publicDomain;
  public $textToSpeechPermission;
  public $viewOrderUrl;
  public $viewability;
  public $webReaderLink;
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setCountry( $country) {
    $this->country = $country;
  }
  public function getCountry() {
    return $this->country;
  }
  public function ***REMOVED***(Google_DownloadAccessRestriction $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setEmbeddable( $embeddable) {
    $this->embeddable = $embeddable;
  }
  public function getEmbeddable() {
    return $this->embeddable;
  }
  public function setEpub(Google_VolumeAccessInfoEpub $epub) {
    $this->epub = $epub;
  }
  public function getEpub() {
    return $this->epub;
  }
  public function setPdf(Google_VolumeAccessInfoPdf $pdf) {
    $this->pdf = $pdf;
  }
  public function getPdf() {
    return $this->pdf;
  }
  public function ***REMOVED***( $publicDomain) {
    $this->publicDomain = $publicDomain;
  }
  public function ***REMOVED***() {
    return $this->publicDomain;
  }
  public function setTextToSpeechPermission( $textToSpeechPermission) {
    $this->textToSpeechPermission = $textToSpeechPermission;
  }
  public function getTextToSpeechPermission() {
    return $this->textToSpeechPermission;
  }
  public function ***REMOVED***( $viewOrderUrl) {
    $this->viewOrderUrl = $viewOrderUrl;
  }
  public function ***REMOVED***() {
    return $this->viewOrderUrl;
  }
  public function ***REMOVED***( $viewability) {
    $this->viewability = $viewability;
  }
  public function ***REMOVED***() {
    return $this->viewability;
  }
  public function ***REMOVED***( $webReaderLink) {
    $this->webReaderLink = $webReaderLink;
  }
  public function ***REMOVED***() {
    return $this->webReaderLink;
  }
}

class Google_VolumeAccessInfoEpub extends Google_Model {
  public $acsTokenLink;
  public $downloadLink;
  public $isAvailable;
  public function ***REMOVED***( $acsTokenLink) {
    $this->acsTokenLink = $acsTokenLink;
  }
  public function ***REMOVED***() {
    return $this->acsTokenLink;
  }
  public function ***REMOVED***( $downloadLink) {
    $this->downloadLink = $downloadLink;
  }
  public function ***REMOVED***() {
    return $this->downloadLink;
  }
  public function ***REMOVED***( $isAvailable) {
    $this->isAvailable = $isAvailable;
  }
  public function ***REMOVED***() {
    return $this->isAvailable;
  }
}

class Google_VolumeAccessInfoPdf extends Google_Model {
  public $acsTokenLink;
  public $downloadLink;
  public $isAvailable;
  public function ***REMOVED***( $acsTokenLink) {
    $this->acsTokenLink = $acsTokenLink;
  }
  public function ***REMOVED***() {
    return $this->acsTokenLink;
  }
  public function ***REMOVED***( $downloadLink) {
    $this->downloadLink = $downloadLink;
  }
  public function ***REMOVED***() {
    return $this->downloadLink;
  }
  public function ***REMOVED***( $isAvailable) {
    $this->isAvailable = $isAvailable;
  }
  public function ***REMOVED***() {
    return $this->isAvailable;
  }
}

class Google_VolumeLayerInfo extends Google_Model {
  protected $__layersType = 'Google_VolumeLayerInfoLayers';
  protected $__layersDataType = 'array';
  public $layers;
  public function setLayers(/* array(Google_VolumeLayerInfoLayers) */ $layers) {
    $this->assertIsArray($layers, 'Google_VolumeLayerInfoLayers', __METHOD__);
    $this->layers = $layers;
  }
  public function getLayers() {
    return $this->layers;
  }
}

class Google_VolumeLayerInfoLayers extends Google_Model {
  public $layerId;
  public $volumeAnnotationsVersion;
  public function setLayerId( $layerId) {
    $this->layerId = $layerId;
  }
  public function getLayerId() {
    return $this->layerId;
  }
  public function setVolumeAnnotationsVersion( $volumeAnnotationsVersion) {
    $this->volumeAnnotationsVersion = $volumeAnnotationsVersion;
  }
  public function getVolumeAnnotationsVersion() {
    return $this->volumeAnnotationsVersion;
  }
}

class Google_VolumeRecommendedInfo extends Google_Model {
  public $explanation;
  public function ***REMOVED***( $explanation) {
    $this->explanation = $explanation;
  }
  public function ***REMOVED***() {
    return $this->explanation;
  }
}

class Google_VolumeSaleInfo extends Google_Model {
  public $buyLink;
  public $country;
  public $isEbook;
  protected $__listPriceType = 'Google_VolumeSaleInfoListPrice';
  protected $__listPriceDataType = '';
  public $listPrice;
  public $onSaleDate;
  protected $__retailPriceType = 'Google_VolumeSaleInfoRetailPrice';
  protected $__retailPriceDataType = '';
  public $retailPrice;
  public $saleability;
  public function setBuyLink( $buyLink) {
    $this->buyLink = $buyLink;
  }
  public function getBuyLink() {
    return $this->buyLink;
  }
  public function setCountry( $country) {
    $this->country = $country;
  }
  public function getCountry() {
    return $this->country;
  }
  public function setIsEbook( $isEbook) {
    $this->isEbook = $isEbook;
  }
  public function getIsEbook() {
    return $this->isEbook;
  }
  public function setListPrice(Google_VolumeSaleInfoListPrice $listPrice) {
    $this->listPrice = $listPrice;
  }
  public function getListPrice() {
    return $this->listPrice;
  }
  public function setOnSaleDate( $onSaleDate) {
    $this->onSaleDate = $onSaleDate;
  }
  public function getOnSaleDate() {
    return $this->onSaleDate;
  }
  public function ***REMOVED***(Google_VolumeSaleInfoRetailPrice $retailPrice) {
    $this->retailPrice = $retailPrice;
  }
  public function ***REMOVED***() {
    return $this->retailPrice;
  }
  public function ***REMOVED***( $saleability) {
    $this->saleability = $saleability;
  }
  public function ***REMOVED***() {
    return $this->saleability;
  }
}

class Google_VolumeSaleInfoListPrice extends Google_Model {
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

class Google_VolumeSaleInfoRetailPrice extends Google_Model {
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

class Google_VolumeSearchInfo extends Google_Model {
  public $textSnippet;
  public function ***REMOVED***( $textSnippet) {
    $this->textSnippet = $textSnippet;
  }
  public function ***REMOVED***() {
    return $this->textSnippet;
  }
}

class Google_VolumeUserInfo extends Google_Model {
  public $isInMyBooks;
  public $isPreordered;
  public $isPurchased;
  public $isUploaded;
  protected $__readingPositionType = 'Google_ReadingPosition';
  protected $__readingPositionDataType = '';
  public $***REMOVED***;
  protected $__reviewType = 'Google_Review';
  protected $__reviewDataType = '';
  public $review;
  public $updated;
  protected $__userUploadedVolumeInfoType = 'Google_VolumeUserInfoUserUploadedVolumeInfo';
  protected $__userUploadedVolumeInfoDataType = '';
  public $userUploadedVolumeInfo;
  public function ***REMOVED***( $isInMyBooks) {
    $this->isInMyBooks = $isInMyBooks;
  }
  public function ***REMOVED***() {
    return $this->isInMyBooks;
  }
  public function ***REMOVED***( $isPreordered) {
    $this->isPreordered = $isPreordered;
  }
  public function ***REMOVED***() {
    return $this->isPreordered;
  }
  public function ***REMOVED***( $isPurchased) {
    $this->isPurchased = $isPurchased;
  }
  public function ***REMOVED***() {
    return $this->isPurchased;
  }
  public function setIsUploaded( $isUploaded) {
    $this->isUploaded = $isUploaded;
  }
  public function getIsUploaded() {
    return $this->isUploaded;
  }
  public function ***REMOVED***(Google_ReadingPosition $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setReview(Google_Review $review) {
    $this->review = $review;
  }
  public function getReview() {
    return $this->review;
  }
  public function setUpdated( $updated) {
    $this->updated = $updated;
  }
  public function getUpdated() {
    return $this->updated;
  }
  public function setUserUploadedVolumeInfo(Google_VolumeUserInfoUserUploadedVolumeInfo $userUploadedVolumeInfo) {
    $this->userUploadedVolumeInfo = $userUploadedVolumeInfo;
  }
  public function getUserUploadedVolumeInfo() {
    return $this->userUploadedVolumeInfo;
  }
}

class Google_VolumeUserInfoUserUploadedVolumeInfo extends Google_Model {
  public $***REMOVED***;
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
}

class Google_VolumeVolumeInfo extends Google_Model {
  public $authors;
  public $averageRating;
  public $***REMOVED***;
  public $categories;
  public $***REMOVED***;
  public $description;
  protected $__dimensionsType = 'Google_VolumeVolumeInfoDimensions';
  protected $__dimensionsDataType = '';
  public $dimensions;
  protected $__imageLinksType = 'Google_VolumeVolumeInfoImageLinks';
  protected $__imageLinksDataType = '';
  public $imageLinks;
  protected $__industryIdentifiersType = 'Google_VolumeVolumeInfoIndustryIdentifiers';
  protected $__industryIdentifiersDataType = 'array';
  public $***REMOVED***;
  public $infoLink;
  public $language;
  public $mainCategory;
  public $pageCount;
  public $previewLink;
  public $printType;
  public $publishedDate;
  public $publisher;
  public $ratingsCount;
  public $subtitle;
  public $title;
  public function setAuthors(/* array(Google_string) */ $authors) {
    $this->assertIsArray($authors, 'Google_string', __METHOD__);
    $this->authors = $authors;
  }
  public function getAuthors() {
    return $this->authors;
  }
  public function ***REMOVED***( $averageRating) {
    $this->averageRating = $averageRating;
  }
  public function ***REMOVED***() {
    return $this->averageRating;
  }
  public function setCanonicalVolumeLink( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getCanonicalVolumeLink() {
    return $this->***REMOVED***;
  }
  public function setCategories(/* array(Google_string) */ $categories) {
    $this->assertIsArray($categories, 'Google_string', __METHOD__);
    $this->categories = $categories;
  }
  public function getCategories() {
    return $this->categories;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $description) {
    $this->description = $description;
  }
  public function ***REMOVED***() {
    return $this->description;
  }
  public function setDimensions(Google_VolumeVolumeInfoDimensions $dimensions) {
    $this->dimensions = $dimensions;
  }
  public function getDimensions() {
    return $this->dimensions;
  }
  public function setImageLinks(Google_VolumeVolumeInfoImageLinks $imageLinks) {
    $this->imageLinks = $imageLinks;
  }
  public function getImageLinks() {
    return $this->imageLinks;
  }
  public function setIndustryIdentifiers(/* array(Google_VolumeVolumeInfoIndustryIdentifiers) */ $***REMOVED***) {
    $this->assertIsArray($***REMOVED***, 'Google_VolumeVolumeInfoIndustryIdentifiers', __METHOD__);
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getIndustryIdentifiers() {
    return $this->***REMOVED***;
  }
  public function setInfoLink( $infoLink) {
    $this->infoLink = $infoLink;
  }
  public function getInfoLink() {
    return $this->infoLink;
  }
  public function setLanguage( $language) {
    $this->language = $language;
  }
  public function getLanguage() {
    return $this->language;
  }
  public function ***REMOVED***( $mainCategory) {
    $this->mainCategory = $mainCategory;
  }
  public function ***REMOVED***() {
    return $this->mainCategory;
  }
  public function setPageCount( $pageCount) {
    $this->pageCount = $pageCount;
  }
  public function getPageCount() {
    return $this->pageCount;
  }
  public function ***REMOVED***( $previewLink) {
    $this->previewLink = $previewLink;
  }
  public function ***REMOVED***() {
    return $this->previewLink;
  }
  public function setPrintType( $printType) {
    $this->printType = $printType;
  }
  public function getPrintType() {
    return $this->printType;
  }
  public function ***REMOVED***( $publishedDate) {
    $this->publishedDate = $publishedDate;
  }
  public function ***REMOVED***() {
    return $this->publishedDate;
  }
  public function setPublisher( $publisher) {
    $this->publisher = $publisher;
  }
  public function getPublisher() {
    return $this->publisher;
  }
  public function ***REMOVED***( $ratingsCount) {
    $this->ratingsCount = $ratingsCount;
  }
  public function ***REMOVED***() {
    return $this->ratingsCount;
  }
  public function setSubtitle( $subtitle) {
    $this->subtitle = $subtitle;
  }
  public function getSubtitle() {
    return $this->subtitle;
  }
  public function setTitle( $title) {
    $this->title = $title;
  }
  public function getTitle() {
    return $this->title;
  }
}

class Google_VolumeVolumeInfoDimensions extends Google_Model {
  public $height;
  public $thickness;
  public $width;
  public function setHeight( $height) {
    $this->height = $height;
  }
  public function getHeight() {
    return $this->height;
  }
  public function setThickness( $thickness) {
    $this->thickness = $thickness;
  }
  public function getThickness() {
    return $this->thickness;
  }
  public function setWidth( $width) {
    $this->width = $width;
  }
  public function getWidth() {
    return $this->width;
  }
}

class Google_VolumeVolumeInfoImageLinks extends Google_Model {
  public $extraLarge;
  public $large;
  public $medium;
  public $small;
  public $***REMOVED***;
  public $thumbnail;
  public function setExtraLarge( $extraLarge) {
    $this->extraLarge = $extraLarge;
  }
  public function getExtraLarge() {
    return $this->extraLarge;
  }
  public function setLarge( $large) {
    $this->large = $large;
  }
  public function getLarge() {
    return $this->large;
  }
  public function setMedium( $medium) {
    $this->medium = $medium;
  }
  public function getMedium() {
    return $this->medium;
  }
  public function setSmall( $small) {
    $this->small = $small;
  }
  public function getSmall() {
    return $this->small;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setThumbnail( $thumbnail) {
    $this->thumbnail = $thumbnail;
  }
  public function getThumbnail() {
    return $this->thumbnail;
  }
}

class Google_VolumeVolumeInfoIndustryIdentifiers extends Google_Model {
  public $identifier;
  public $type;
  public function setIdentifier( $identifier) {
    $this->identifier = $identifier;
  }
  public function getIdentifier() {
    return $this->identifier;
  }
  public function setType( $type) {
    $this->type = $type;
  }
  public function getType() {
    return $this->type;
  }
}

class Google_Volumeannotation extends Google_Model {
  public $***REMOVED***;
  public $***REMOVED***;
  public $***REMOVED***;
  protected $__contentRangesType = 'Google_VolumeannotationContentRanges';
  protected $__contentRangesDataType = '';
  public $contentRanges;
  public $data;
  public $deleted;
  public $id;
  public $kind;
  public $layerId;
  public $pageIds;
  public $selectedText;
  public $selfLink;
  public $updated;
  public $volumeId;
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function setAnnotationDataLink( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function getAnnotationDataLink() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(Google_VolumeannotationContentRanges $contentRanges) {
    $this->contentRanges = $contentRanges;
  }
  public function ***REMOVED***() {
    return $this->contentRanges;
  }
  public function setData( $data) {
    $this->data = $data;
  }
  public function getData() {
    return $this->data;
  }
  public function setDeleted( $deleted) {
    $this->deleted = $deleted;
  }
  public function getDeleted() {
    return $this->deleted;
  }
  public function setId( $id) {
    $this->id = $id;
  }
  public function getId() {
    return $this->id;
  }
  public function setKind( $kind) {
    $this->kind = $kind;
  }
  public function getKind() {
    return $this->kind;
  }
  public function setLayerId( $layerId) {
    $this->layerId = $layerId;
  }
  public function getLayerId() {
    return $this->layerId;
  }
  public function setPageIds(/* array(Google_string) */ $pageIds) {
    $this->assertIsArray($pageIds, 'Google_string', __METHOD__);
    $this->pageIds = $pageIds;
  }
  public function getPageIds() {
    return $this->pageIds;
  }
  public function ***REMOVED***( $selectedText) {
    $this->selectedText = $selectedText;
  }
  public function ***REMOVED***() {
    return $this->selectedText;
  }
  public function setSelfLink( $selfLink) {
    $this->selfLink = $selfLink;
  }
  public function getSelfLink() {
    return $this->selfLink;
  }
  public function setUpdated( $updated) {
    $this->updated = $updated;
  }
  public function getUpdated() {
    return $this->updated;
  }
  public function setVolumeId( $volumeId) {
    $this->volumeId = $volumeId;
  }
  public function getVolumeId() {
    return $this->volumeId;
  }
}

class Google_VolumeannotationContentRanges extends Google_Model {
  protected $__cfiRangeType = 'Google_BooksAnnotationsRange';
  protected $__cfiRangeDataType = '';
  public $cfiRange;
  public $***REMOVED***;
  protected $__gbImageRangeType = 'Google_BooksAnnotationsRange';
  protected $__gbImageRangeDataType = '';
  public $gbImageRange;
  protected $__gbTextRangeType = 'Google_BooksAnnotationsRange';
  protected $__gbTextRangeDataType = '';
  public $gbTextRange;
  public function setCfiRange(Google_BooksAnnotationsRange $cfiRange) {
    $this->cfiRange = $cfiRange;
  }
  public function getCfiRange() {
    return $this->cfiRange;
  }
  public function ***REMOVED***( $***REMOVED***) {
    $this->***REMOVED*** = $***REMOVED***;
  }
  public function ***REMOVED***() {
    return $this->***REMOVED***;
  }
  public function ***REMOVED***(Google_BooksAnnotationsRange $gbImageRange) {
    $this->gbImageRange = $gbImageRange;
  }
  public function ***REMOVED***() {
    return $this->gbImageRange;
  }
  public function ***REMOVED***(Google_BooksAnnotationsRange $gbTextRange) {
    $this->gbTextRange = $gbTextRange;
  }
  public function ***REMOVED***() {
    return $this->gbTextRange;
  }
}

class Google_Volumeannotations extends Google_Model {
  protected $__itemsType = 'Google_Volumeannotation';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public $nextPageToken;
  public $totalItems;
  public $version;
  public function setItems(/* array(Google_Volumeannotation) */ $items) {
    $this->assertIsArray($items, 'Google_Volumeannotation', __METHOD__);
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
  public function setTotalItems( $totalItems) {
    $this->totalItems = $totalItems;
  }
  public function getTotalItems() {
    return $this->totalItems;
  }
  public function setVersion( $version) {
    $this->version = $version;
  }
  public function getVersion() {
    return $this->version;
  }
}

class Google_Volumes extends Google_Model {
  protected $__itemsType = 'Google_Volume';
  protected $__itemsDataType = 'array';
  public $items;
  public $kind;
  public $totalItems;
  public function setItems(/* array(Google_Volume) */ $items) {
    $this->assertIsArray($items, 'Google_Volume', __METHOD__);
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
  public function setTotalItems( $totalItems) {
    $this->totalItems = $totalItems;
  }
  public function getTotalItems() {
    return $this->totalItems;
  }
}
