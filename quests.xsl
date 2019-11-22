<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <html>
      <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css" />
      </head>
  <body>
    <h2>Quest List</h2>
    <table border="1" class="table">
      <tr bgcolor="#9acd32">
        <th scope="col">Name</th>
        <th scope="col">Date Completed</th>
      </tr>
      <xsl:for-each select="/quests/quest">
      <tr scope="row">
        <td><xsl:value-of select="name" /></td>
        <td><xsl:value-of select="dateCompleted" /></td>
      </tr>
      </xsl:for-each>
    </table>
    <!-- <button class="btn btn-primary">Go to players list (/players)</button> -->
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>

