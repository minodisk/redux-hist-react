import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import * as hist from "redux-hist";

export interface AnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  push?: (pathname: string) => void;
}

class AnchorBase extends React.Component<AnchorProps, {}> {
  public render() {
    const {
      push,
      onClick,
      ...props,
    } = this.props;
    return (
      <a
        onClick={this.onClick}
        {...props}
      >{this.props.children}</a>
    );
  }

  private onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (this.props.onClick != null) {
      this.props.onClick(e);
    }

    if (
      e.defaultPrevented ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.metaKey ||
      (e.button != null && e.button !== 0) ||
      (this.props.target != null && this.props.target !== "_self")
    ) {
      return;
    }

    e.preventDefault();

    if (this.props.push == null || this.props.href == null) {
      return;
    }
    this.props.push(this.props.href);
  }
}

export const Anchor = connect<void, {}, AnchorProps>(
  null,
  (dispatch: Dispatch<any>): any => {
    return {
      push: (pathname: string) => dispatch(hist.push(pathname)),
    };
  },
)(AnchorBase);
