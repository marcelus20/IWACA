<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:template match="/">
  <html>
      <head>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css" />
      </head>
  <body>
    <h2>Players List</h2>
    <table border="1" class="table">
      <tr bgcolor="#9acd32">
        <th scope="col">Name</th>
        <th scope="col">Vocation</th>
        <th scope="col">Level</th>
        <th scope="col">City</th>
        <th scope="col">Sex</th>
      </tr>
      <xsl:for-each select="/players/player">
      <tr scope="row">
        <td><xsl:value-of select="name" /></td>
        <td><xsl:value-of select="vocation" /></td>
        <td><xsl:value-of select="level" /></td>
        <td><xsl:value-of select="city" /></td>
        <td><xsl:value-of select="sex" /></td>
      </tr>
      </xsl:for-each>
    </table>
    <!-- <button class="btn btn-primary" id="gotoquest">Go to quest list (/quests)</button> -->
  </body>
  </html>
</xsl:template>
</xsl:stylesheet>

