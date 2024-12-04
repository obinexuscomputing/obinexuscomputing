export class FPattern {
  name: string;
  constructor() {
    this.name = 'f';
  }

  render(content: {
    header: string;
    main: string;
    sidebar: string;
    secondary: string;
    sidebarSecondary?: string;
  }) {
    return `
      <div class="f-pattern__header with-drop-cap">
        ${content.header}
      </div>
      <div class="f-pattern__section">
        <div class="f-pattern__content with-drop-cap">
          ${content.main}
        </div>
        <div class="f-pattern__sidebar">
          ${content.sidebar}
        </div>
      </div>
      <div class="f-pattern__section">
        <div class="f-pattern__content">
          ${content.secondary}
        </div>
        <div class="f-pattern__sidebar">
          ${content.sidebarSecondary || ""}
        </div>
      </div>
    `;
  }

  skeleton() {
    return `
      <div class="f-pattern__header">
        <div class="skeleton-text-group">
          <div class="skeleton-text"></div>
        </div>
      </div>
      <div class="f-pattern__section">
        <div class="f-pattern__content">
          <div class="skeleton-text-group">
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text"></div>
          </div>
        </div>
        <div class="f-pattern__sidebar">
          <div class="skeleton-text"></div>
        </div>
      </div>
    `;
  }
}