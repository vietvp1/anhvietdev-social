<Col
  key={Math.random()}
  xs={6}
  md={6}
  onClick={this.openModal.bind(this, conditionalRender ? 1 : 0)}
  className="border background"
  style={{
    background: `url(${conditionalRender ? images[1] : images[0]})`,
    height: '100%',
  }}>
  {this.renderOverlay()}
</Col>
  <Col
    key={Math.random()}
    xs={6}
    md={6}
    onClick={this.openModal.bind(this, conditionalRender ? 2 : 1)}
    className="border background"
    style={{
      background: `url(${conditionalRender ? images[2] : images[1]})`,
      height: '100%',
    }}>
    {overlay}
  </Col>