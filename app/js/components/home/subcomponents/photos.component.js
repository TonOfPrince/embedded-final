import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {action, extendObservable} from 'mobx';
import _ from 'lodash';
import styles from '../home.module.css';

const Photos = ({routingStore, photosStore}) => <div className = {styles.photos}>
    <div className = {styles.title}>PHOTOS</div>
    <input type="file" name="myImage" onChange= {photosStore.addFile} />
    <div className = {styles.upload} onClick = {photosStore.uploadFile}>UPLOAD</div>
    {photosStore.err ? <div className = {styles.err}>{photosStore.err}</div> : ""}
    <div className = {styles.list}>
    {
        _.map(photosStore.photos, photo => <div className = {styles.photo}>
            <img className = {styles.img} src = {`../../../../photos/${photo}`} />
            <div className = {styles.name}>
                <div className = {styles.remove} onClick = {() => photosStore.removePhoto(photo)}>X</div>
                <div>{photo}</div>
            </div>
        </div>)
    }
    </div>
</div>;

export const PhotosView = inject('routingStore', 'photosStore')(observer(Photos));
