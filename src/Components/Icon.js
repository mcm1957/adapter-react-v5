import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';

import {
    SettingsApplications as IconSystem,
    Photo as IconPhoto,
    SupervisedUserCircle as IconGroup,
    PersonOutlined as IconUser,
    Router as IconHost,
    Wifi as IconConnection,
    Info as IconInfo,
    Description as IconMeta,
} from '@mui/icons-material';
import IconAlias from '../icons/IconAlias';

import Utils from './Utils';

export function getSystemIcon(obj) {
    let icon;
    const id = obj?._id;

    if (!id) {
        return null;
    }

    // system or design has special icons
    if (id.startsWith('_design/') || (id === 'system')) {
        icon = <IconSystem className="iconOwn" />;
    } else if (id === '0_userdata' || id === '0_userdata.0') {
        icon = <IconPhoto className="iconOwn" />;
    } else if (id === 'alias' || id === 'alias.0') {
        icon = <IconAlias className="iconOwn" />;
    } else if (id === 'system.adapter') {
        icon = <IconSystem className="iconOwn" />;
    } else if (id === 'system.group') {
        icon = <IconGroup className="iconOwn" />;
    } else if (id === 'system.user') {
        icon = <IconUser className="iconOwn" />;
    } else if (id === 'system.host') {
        icon = <IconHost className="iconOwn" />;
    } else if (id.endsWith('.connection') || id.endsWith('.connected')) {
        icon = <IconConnection className="iconOwn" />;
    } else if (id.endsWith('.info')) {
        icon = <IconInfo className="iconOwn" />;
    } else if (obj?.type === 'meta') {
        icon = <IconMeta className="iconOwn" />;
    }

    return icon || null;
}

export function getSelectIdIcon(obj, imagePrefix) {
    imagePrefix = imagePrefix || '.'; // http://localhost:8081';
    let src = '';
    const common = obj?.common;

    if (common) {
        const cIcon = common.icon;
        if (cIcon) {
            if (!cIcon.startsWith('data:image/')) {
                if (cIcon.includes('.')) {
                    let instance;
                    if (obj.type === 'instance' || obj.type === 'adapter') {
                        src = `${imagePrefix}/adapter/${common.name}/${cIcon}`;
                    } else if (obj._id && obj._id.startsWith('system.adapter.')) {
                        instance = obj._id.split('.', 3);
                        if (cIcon[0] === '/') {
                            instance[2] += cIcon;
                        } else {
                            instance[2] += `/${cIcon}`;
                        }
                        src = `${imagePrefix}/adapter/${instance[2]}`;
                    } else {
                        instance = obj._id.split('.', 2);
                        if (cIcon[0] === '/') {
                            instance[0] += cIcon;
                        } else {
                            instance[0] += `/${cIcon}`;
                        }
                        src = `${imagePrefix}/adapter/${instance[0]}`;
                    }
                } else {
                    return null;
                }
            } else {
                // base 64 image
                src = cIcon;
            }
        }
    }

    return src || null;
}

class Icon extends React.Component {
    render() {
        if (this.props.src) {
            if (typeof this.props.src === 'string') {
                if (this.props.src.length < 3) {
                    // utf-8 char
                    return <span
                        title={this.props.title || undefined}
                        style={{ height: 27, marginTop: -8, ...(this.props.styleUTF8 || this.props.style) }}
                        className={Utils.clsx(this.props.className, 'iconOwn')}
                    >
                        {this.props.src}
                    </span>;
                }
                if (this.props.src.startsWith('data:image/svg')) {
                    return <SVG
                        title={this.props.title || undefined}
                        src={this.props.src}
                        className={Utils.clsx(this.props.className, 'iconOwn')}
                        width={this.props.style?.width || 28}
                        height={this.props.style?.height || this.props.style?.width || 28}
                        style={this.props.style || {}}
                    />;
                }
                return <img
                    title={this.props.title || undefined}
                    style={this.props.style || {}}
                    className={Utils.clsx(this.props.className, 'iconOwn')}
                    src={this.props.src}
                    alt=""
                />;
            }
            return this.props.src;
        }
        return null;
    }
}

Icon.propTypes = {
    title: PropTypes.string,
    src: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    className: PropTypes.string,
    style: PropTypes.object,
    styleUTF8: PropTypes.object,
};

export default Icon;
