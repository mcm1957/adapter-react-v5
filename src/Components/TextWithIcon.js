import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@mui/styles';

import Icon from './Icon';
import Utils from './Utils';

const styles = () => ({
    div: {
        borderRadius: 3,
        padding: '0 3px',
        lineHeight: '20px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        width: 16,
        height: 16,
        marginRight: 8,
        verticalAlign: 'middle',
    },
    text: {
        display: 'inline-block',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
});

const TextWithIcon = props => {
    let item = props.value;
    const prefix = props.removePrefix || '';

    if (typeof item === 'string') {
        const list = props.list || props.options;
        if (props.list) {
            if (Array.isArray(list)) {
                const _item = list.find(obj => obj._id === prefix + item);
                if (_item) {
                    item = {
                        name: Utils.getObjectNameFromObj(_item, props.lang).replace('system.group.', ''),
                        value: _item._id,
                        icon: props.icon || _item.common?.icon,
                        color: props.color || _item.common?.color,
                    };
                } else {
                    item = {
                        name: item,
                        value: prefix + item,
                    };
                }
            } else if (list[prefix + item]) {
                item = {
                    name: Utils.getObjectNameFromObj(list[prefix + item], props.lang).replace('system.group.', ''),
                    value: list[prefix + item]._id,
                    icon: props.icon || list[prefix + item].common?.icon,
                    color: props.color || list[prefix + item].common?.color,
                };
            } else {
                item = {
                    name: item,
                    value: prefix + item,
                    icon: props.icon,
                    color: props.color,
                };
            }
        } else {
            item = {
                name: item,
                value: prefix + item,
                icon: props.icon,
                color: props.color,
            };
        }
    } else if (!item || typeof item !== 'object') {
        item = {
            name: '',
            value: '',
            icon: props.icon,
            color: props.color,
        };
    } else {
        item = {
            name: Utils.getObjectNameFromObj(item, props.lang)
                .replace('system.group.', '')
                .replace('system.user.', '')
                .replace('enum.rooms.', '')
                .replace('enum.functions.', ''),
            value: item._id,
            icon: props.icon || item.common?.icon,
            color: props.color || item.common?.color,
        };
    }

    const style = item?.color ? {
        border:`1px solid ${Utils.invertColor(item?.color)}`,
        color: Utils.getInvertedColor(item?.color, props.themeType, true) || undefined,
        backgroundColor: item?.color,
    } : {};

    return <div
        style={{ ...props.style, ...style }}
        className={Utils.clsx(props.className, props.classes.div, props.moreClasses?.root)}
        title={props.title || item.value}
    >
        {item?.icon ? <Icon src={item?.icon} className={Utils.clsx(props.classes.icon, props.moreClasses?.icon)} /> : null}
        <div className={Utils.clsx(props.classes.text, props.moreClasses?.text)}>{item?.name}</div>
    </div>;
};

TextWithIcon.propTypes = {
    lang: PropTypes.string.isRequired,
    themeType: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    list: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // one of "list"(Array) or "options"(object) is required
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]), // one of "list"(Array) or "options"(object) is required
    className: PropTypes.string,
    style: PropTypes.object,
    title: PropTypes.string,
    removePrefix: PropTypes.string,
    moreClasses: PropTypes.object,
    icon: PropTypes.string,
    color: PropTypes.string,
};

export default withStyles(styles)(TextWithIcon);
